import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";

/**
 * Health check endpoint
 * Returns the health status of the application and its dependencies
 */
export async function GET() {
  const startTime = Date.now();
  const health: {
    status: "healthy" | "unhealthy";
    timestamp: string;
    uptime: number;
    version: string;
    checks: {
      database: {
        status: "healthy" | "unhealthy";
        responseTime?: number;
        error?: string;
      };
      // Add more checks as needed (e.g., Sanity CMS, external APIs)
    };
  } = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || "1.0.0",
    checks: {
      database: {
        status: "unhealthy",
      },
    },
  };

  // Check database connection
  try {
    const dbStartTime = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    const dbResponseTime = Date.now() - dbStartTime;
    health.checks.database = {
      status: "healthy",
      responseTime: dbResponseTime,
    };
  } catch (error) {
    health.checks.database = {
      status: "unhealthy",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    health.status = "unhealthy";
  }

  // Calculate total response time
  const responseTime = Date.now() - startTime;

  // Return appropriate status code based on health
  const statusCode = health.status === "healthy" ? 200 : 503;

  return NextResponse.json(
    {
      ...health,
      responseTime,
    },
    { status: statusCode }
  );
}
