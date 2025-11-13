import { NextRequest, NextResponse } from "next/server";
import {
  fetchKPIMetrics,
  generateInsights,
  detectAnomalies,
} from "@/lib/analytics/reporting";

/**
 * GET /api/analytics/insights
 * Generate insights and detect anomalies from analytics data
 * 
 * Query parameters:
 * - startDate: Start date in YYYY-MM-DD format (default: 30 days ago)
 * - endDate: End date in YYYY-MM-DD format (default: today)
 * - compareWithPrevious: Whether to compare with previous period (default: true)
 */
export async function GET(request: NextRequest) {
  try {
    // Check for API key authentication
    const apiKey = request.headers.get("x-api-key");
    const expectedApiKey = process.env.ANALYTICS_API_KEY;

    if (expectedApiKey && apiKey !== expectedApiKey) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const endDate = searchParams.get("endDate") || new Date().toISOString().split("T")[0];
    const startDate =
      searchParams.get("startDate") ||
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];
    const compareWithPrevious =
      searchParams.get("compareWithPrevious") !== "false";

    // Fetch current period metrics
    const currentMetrics = await fetchKPIMetrics(startDate, endDate);

    let insights: any[] = [];
    let previousMetrics = null;

    // Compare with previous period if requested
    if (compareWithPrevious) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const periodDays = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );

      const previousEndDate = new Date(start);
      previousEndDate.setDate(previousEndDate.getDate() - 1);
      const previousStartDate = new Date(previousEndDate);
      previousStartDate.setDate(previousStartDate.getDate() - periodDays);

      const prevStart = previousStartDate.toISOString().split("T")[0];
      const prevEnd = previousEndDate.toISOString().split("T")[0];

      try {
        previousMetrics = await fetchKPIMetrics(prevStart, prevEnd);
        insights = await generateInsights(currentMetrics, previousMetrics);
      } catch (error) {
        console.warn("Could not fetch previous period metrics:", error);
      }
    }

    // Detect anomalies (using current metrics as baseline for now)
    const anomalies = detectAnomalies(currentMetrics, currentMetrics);

    return NextResponse.json({
      success: true,
      data: {
        currentPeriod: currentMetrics,
        previousPeriod: previousMetrics,
        insights,
        anomalies,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error generating insights:", error);

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
        error: "Failed to generate insights",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

