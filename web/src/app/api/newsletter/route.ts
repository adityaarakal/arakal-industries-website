import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";
import { z } from "zod";
import { Resend } from "resend";
import { COMPANY_INFO } from "@/lib/constants";

const resend = new Resend(process.env.RESEND_API_KEY);

const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
  source: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = newsletterSchema.parse(body);

    // Check if email already exists
    const existingSubscription = await prisma.newsletterSubscription.findUnique({
      where: {
        email: validatedData.email,
      },
    });

    if (existingSubscription) {
      // If already subscribed, return success but don't create duplicate
      if (existingSubscription.status === "active") {
        return NextResponse.json(
          {
            success: true,
            message: "You are already subscribed to our newsletter",
          },
          { status: 200 }
        );
      }

      // If unsubscribed, reactivate
      await prisma.newsletterSubscription.update({
        where: {
          email: validatedData.email,
        },
        data: {
          status: "active",
          source: validatedData.source || "web",
          updatedAt: new Date(),
        },
      });

      return NextResponse.json(
        {
          success: true,
          message: "You have been resubscribed to our newsletter",
        },
        { status: 200 }
      );
    }

    // Create new subscription
    const subscription = await prisma.newsletterSubscription.create({
      data: {
        email: validatedData.email,
        status: "active",
        source: validatedData.source || "web",
        metadata: {
          subscribedAt: new Date().toISOString(),
          source: validatedData.source || "web",
        },
      },
    });

    // Send confirmation email
    if (process.env.RESEND_API_KEY) {
      const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@arakalindustries.com";

      try {
        await resend.emails.send({
          from: `Arakal Industries <${fromEmail}>`,
          to: [validatedData.email],
          subject: "Welcome to Arakal Industries Newsletter",
          html: `
            <p>Dear Subscriber,</p>
            <p>Thank you for subscribing to the Arakal Industries newsletter!</p>
            <p>You will now receive updates about our products, manufacturing capabilities, sustainability initiatives, and industry news.</p>
            <p>If you have any questions or need to unsubscribe, please contact us at ${COMPANY_INFO.contact.email}.</p>
            <p>Best regards,</p>
            <p>The Arakal Industries Team</p>
          `,
        });
      } catch (error) {
        console.error("Error sending confirmation email:", error);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed to newsletter",
        subscriptionId: subscription.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
