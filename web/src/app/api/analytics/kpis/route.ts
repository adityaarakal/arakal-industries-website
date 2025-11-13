import { NextRequest, NextResponse } from "next/server";
import { fetchKPIMetrics } from "@/lib/analytics/reporting";

/**
 * GET /api/analytics/kpis
 * Fetch KPI metrics from Google Analytics
 * 
 * Query parameters:
 * - startDate: Start date in YYYY-MM-DD format (default: 30 days ago)
 * - endDate: End date in YYYY-MM-DD format (default: today)
 */
export async function GET(request: NextRequest) {
  try {
    // Check for API key authentication (optional but recommended)
    const apiKey = request.headers.get("x-api-key");
    const expectedApiKey = process.env.ANALYTICS_API_KEY;

    if (expectedApiKey && apiKey !== expectedApiKey) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get date range from query parameters
    const searchParams = request.nextUrl.searchParams;
    const endDate = searchParams.get("endDate") || new Date().toISOString().split("T")[0];
    const startDate =
      searchParams.get("startDate") ||
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];

    // Validate dates
    if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
      return NextResponse.json(
        { error: "Invalid date format. Use YYYY-MM-DD" },
        { status: 400 }
      );
    }

    // Fetch metrics
    const metrics = await fetchKPIMetrics(startDate, endDate);

    return NextResponse.json({
      success: true,
      data: metrics,
    });
  } catch (error) {
    console.error("Error fetching KPI metrics:", error);

    // Check if it's a configuration error
    if (error instanceof Error && error.message.includes("credentials")) {
      return NextResponse.json(
        {
          error: "Analytics not configured",
          message: error.message,
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to fetch analytics data",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

