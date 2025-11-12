import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";
import { leadFormSchema } from "@/lib/validations/lead";
import { Resend } from "resend";
import { COMPANY_INFO } from "@/lib/constants";
import { rateLimit } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limit configuration for leads endpoint
const leadsRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // 5 requests per 15 minutes per IP
});

// HubSpot API configuration
const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID;

async function sendToHubSpot(leadData: {
  email: string;
  name?: string;
  company?: string;
  phone?: string;
  message?: string;
  source?: string;
  referrer?: string;
  metadata?: Record<string, unknown>;
}) {
  if (!HUBSPOT_API_KEY) {
    console.warn("HubSpot API key not configured. Skipping HubSpot sync.");
    return null;
  }

  try {
    // Use HubSpot CRM API v3
    const hubspotUrl = "https://api.hubapi.com/crm/v3/objects/contacts";
    const nameParts = leadData.name?.split(" ") || [];
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const properties: Record<string, string> = {
      email: leadData.email,
      firstname: firstName,
      lastname: lastName,
      company: leadData.company || "",
      phone: leadData.phone || "",
      website: leadData.referrer || "",
      hs_lead_status: "NEW",
    };

    // Add lead source if available
    if (leadData.source) {
      properties.lead_source = leadData.source;
    }

    // Add metadata as custom properties if needed
    if (leadData.metadata) {
      if (leadData.metadata.productCategories) {
        properties.product_interests = Array.isArray(leadData.metadata.productCategories)
          ? leadData.metadata.productCategories.join(", ")
          : String(leadData.metadata.productCategories);
      }
      if (leadData.metadata.volume) {
        properties.estimated_volume = String(leadData.metadata.volume);
      }
      if (leadData.metadata.weavePreference) {
        properties.weave_preference = String(leadData.metadata.weavePreference);
      }
      if (leadData.metadata.facilityPreference) {
        properties.facility_preference = String(leadData.metadata.facilityPreference);
      }
      if (leadData.metadata.targetMarket) {
        properties.target_market = String(leadData.metadata.targetMarket);
      }
      if (leadData.metadata.preferredContactMethod) {
        properties.preferred_contact_method = String(leadData.metadata.preferredContactMethod);
      }
      if (leadData.metadata.hearAboutUs) {
        properties.hear_about_us = String(leadData.metadata.hearAboutUs);
      }
      if (leadData.metadata.customRequirements) {
        properties.custom_requirements = String(leadData.metadata.customRequirements);
      }
      if (leadData.metadata.certificationRequirements) {
        properties.certification_requirements = Array.isArray(
          leadData.metadata.certificationRequirements
        )
          ? leadData.metadata.certificationRequirements.join(", ")
          : String(leadData.metadata.certificationRequirements);
      }
      if (leadData.metadata.logisticsTimeline) {
        properties.logistics_timeline = String(leadData.metadata.logisticsTimeline);
      }
    }

    const response = await fetch(hubspotUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HUBSPOT_API_KEY}`,
      },
      body: JSON.stringify({
        properties,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("HubSpot API error:", error);
      // Try to update existing contact if creation fails
      return await updateHubSpotContact(leadData.email, properties);
    }

    const data = await response.json();
    return data.id || null; // Return HubSpot contact ID
  } catch (error) {
    console.error("Error sending to HubSpot:", error);
    return null;
  }
}

async function updateHubSpotContact(email: string, properties: Record<string, string>) {
  if (!HUBSPOT_API_KEY) {
    return null;
  }

  try {
    // First, try to find the contact by email
    const searchUrl = "https://api.hubapi.com/crm/v3/objects/contacts/search";
    const searchResponse = await fetch(searchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HUBSPOT_API_KEY}`,
      },
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [
              {
                propertyName: "email",
                operator: "EQ",
                value: email,
              },
            ],
          },
        ],
      }),
    });

    if (searchResponse.ok) {
      const searchData = await searchResponse.json();
      if (searchData.results && searchData.results.length > 0) {
        const contactId = searchData.results[0].id;
        // Update existing contact
        const updateUrl = `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`;
        const updateResponse = await fetch(updateUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${HUBSPOT_API_KEY}`,
          },
          body: JSON.stringify({
            properties,
          }),
        });

        if (updateResponse.ok) {
          const updateData = await updateResponse.json();
          return updateData.id || contactId;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Error updating HubSpot contact:", error);
    return null;
  }
}

async function sendEmailNotification(leadData: {
  email: string;
  name?: string;
  company?: string;
  phone?: string;
  message?: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("Resend API key not configured. Skipping email notification.");
    return;
  }

  try {
    // Send notification to internal team
    const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@arakalindustries.com";
    const toEmail = process.env.RESEND_TO_EMAIL || COMPANY_INFO.contact.email;

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `New Lead: ${leadData.name || leadData.email}`,
      html: `
        <h2>New Lead Submission</h2>
        <p><strong>Name:</strong> ${leadData.name || "N/A"}</p>
        <p><strong>Email:</strong> ${leadData.email}</p>
        <p><strong>Phone:</strong> ${leadData.phone || "N/A"}</p>
        <p><strong>Company:</strong> ${leadData.company || "N/A"}</p>
        <p><strong>Message:</strong> ${leadData.message || "N/A"}</p>
      `,
    });

    // Send auto-response to lead
    await resend.emails.send({
      from: fromEmail,
      to: leadData.email,
      subject: "Thank you for your interest in Arakal Industries",
      html: `
        <h2>Thank you for contacting Arakal Industries!</h2>
        <p>Dear ${leadData.name || "Valued Customer"},</p>
        <p>We have received your request and will get back to you shortly.</p>
        <p>In the meantime, feel free to contact us at:</p>
        <ul>
          <li>Phone: ${COMPANY_INFO.contact.phone}</li>
          <li>Email: ${COMPANY_INFO.contact.email}</li>
        </ul>
        <p>Best regards,<br>Arakal Industries Team</p>
      `,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check rate limit
    const rateLimitResult = leadsRateLimit(request);
    if (rateLimitResult) {
      return NextResponse.json(
        {
          success: false,
          message: rateLimitResult.message,
          error: rateLimitResult.error,
          remaining: rateLimitResult.remaining,
          resetAt: rateLimitResult.resetAt,
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": rateLimitResult.resetAt,
            "Retry-After": Math.ceil(
              (new Date(rateLimitResult.resetAt).getTime() - Date.now()) / 1000
            ).toString(),
          },
        }
      );
    }

    const body = await request.json();
    const validatedData = leadFormSchema.parse(body);

    // Get referrer from request headers
    const referrer = request.headers.get("referer") || validatedData.referrer;

    // Prepare metadata object
    const metadata = {
      productCategories: validatedData.productCategories,
      volume: validatedData.volume,
      weavePreference: validatedData.weavePreference,
      customRequirements: validatedData.customRequirements,
      certificationRequirements: validatedData.certificationRequirements,
      logisticsTimeline: validatedData.logisticsTimeline,
      facilityPreference: validatedData.facilityPreference,
      targetMarket: validatedData.targetMarket,
      preferredContactMethod: validatedData.preferredContactMethod,
      hearAboutUs: validatedData.hearAboutUs,
      ...(validatedData.metadata || {}),
    };

    // Create lead in database
    const lead = await prisma.lead.create({
      data: {
        email: validatedData.email,
        name: validatedData.name,
        company: validatedData.company,
        phone: validatedData.phone,
        message: validatedData.message,
        source: validatedData.source || "web",
        referrer: referrer,
        metadata: metadata,
        status: "new",
      },
    });

    // Send to HubSpot (async, don't wait for response)
    sendToHubSpot({
      email: validatedData.email,
      name: validatedData.name,
      company: validatedData.company,
      phone: validatedData.phone,
      message: validatedData.message,
      source: validatedData.source,
      referrer: referrer,
      metadata: metadata,
    })
      .then(async (hubspotId) => {
        if (hubspotId) {
          // Update lead with HubSpot ID
          try {
            await prisma.lead.update({
              where: { id: lead.id },
              data: { hubspotId: String(hubspotId) },
            });
          } catch (error) {
            console.error("Error updating lead with HubSpot ID:", error);
          }
        }
      })
      .catch((error) => {
        console.error("Error syncing to HubSpot:", error);
      });

    // Send email notifications (async, don't wait for response)
    sendEmailNotification({
      email: validatedData.email,
      name: validatedData.name,
      company: validatedData.company,
      phone: validatedData.phone,
      message: validatedData.message,
    }).catch((error) => {
      console.error("Error sending email notification:", error);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Lead submitted successfully",
        leadId: lead.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating lead:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: error,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create lead",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve leads (admin only - should be protected)
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication/authorization check
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");
    const status = searchParams.get("status");

    const where = status ? { status } : {};

    const leads = await prisma.lead.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: { createdAt: "desc" },
    });

    const total = await prisma.lead.count({ where });

    return NextResponse.json({
      success: true,
      data: leads,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch leads",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

