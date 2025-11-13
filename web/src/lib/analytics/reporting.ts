/**
 * Analytics reporting utilities
 * Generates KPIs, insights, and reports from analytics data
 */

import { BetaAnalyticsDataClient } from "@google-analytics/data";

export interface KPIMetrics {
  // Traffic metrics
  totalUsers: number;
  newUsers: number;
  returningUsers: number;
  sessions: number;
  pageViews: number;
  averageSessionDuration: number;
  bounceRate: number;

  // Engagement metrics
  formSubmissions: number;
  newsletterSubscriptions: number;
  productViews: number;
  downloads: number;
  whatsappClicks: number;
  phoneClicks: number;
  emailClicks: number;

  // Conversion metrics
  leadConversionRate: number;
  formCompletionRate: number;
  topPages: Array<{ path: string; views: number }>;
  topReferrers: Array<{ source: string; sessions: number }>;
  deviceBreakdown: {
    desktop: number;
    mobile: number;
    tablet: number;
  };

  // Time period
  startDate: string;
  endDate: string;
  period: "day" | "week" | "month" | "year";
}

export interface AnalyticsInsight {
  type: "positive" | "negative" | "neutral";
  title: string;
  description: string;
  metric: string;
  change: number; // Percentage change
  recommendation?: string;
}

/**
 * Initialize Google Analytics Data API client
 */
function getAnalyticsClient() {
  const credentials = process.env.GOOGLE_ANALYTICS_CREDENTIALS;
  const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;

  if (!credentials || !propertyId) {
    throw new Error(
      "Google Analytics credentials and property ID are required. Set GOOGLE_ANALYTICS_CREDENTIALS and GOOGLE_ANALYTICS_PROPERTY_ID environment variables."
    );
  }

  const credentialsJson = JSON.parse(credentials);
  const client = new BetaAnalyticsDataClient({
    credentials: credentialsJson,
  });

  return { client, propertyId };
}

/**
 * Fetch KPI metrics from Google Analytics
 */
export async function fetchKPIMetrics(
  startDate: string,
  endDate: string
): Promise<KPIMetrics> {
  try {
    const { client, propertyId } = getAnalyticsClient();

    // Fetch basic traffic metrics
    const [trafficResponse] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate,
          endDate,
        },
      ],
      dimensions: [
        { name: "date" },
        { name: "deviceCategory" },
        { name: "sessionSource" },
      ],
      metrics: [
        { name: "totalUsers" },
        { name: "newUsers" },
        { name: "sessions" },
        { name: "screenPageViews" },
        { name: "averageSessionDuration" },
        { name: "bounceRate" },
      ],
    });

    // Fetch custom events
    const [eventsResponse] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate,
          endDate,
        },
      ],
      dimensions: [{ name: "eventName" }],
      metrics: [{ name: "eventCount" }],
    });

    // Fetch top pages
    const [pagesResponse] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate,
          endDate,
        },
      ],
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }],
      orderBys: [
        {
          metric: { metricName: "screenPageViews" },
          desc: true,
        },
      ],
      limit: 10,
    });

    // Process traffic data
    let totalUsers = 0;
    let newUsers = 0;
    let sessions = 0;
    let pageViews = 0;
    let totalDuration = 0;
    let totalBounceRate = 0;
    const deviceBreakdown = { desktop: 0, mobile: 0, tablet: 0 };
    const referrers: Record<string, number> = {};

    trafficResponse.rows?.forEach((row) => {
      const users = parseInt(row.metricValues?.[0]?.value || "0", 10);
      const newUserCount = parseInt(row.metricValues?.[1]?.value || "0", 10);
      const sessionCount = parseInt(row.metricValues?.[2]?.value || "0", 10);
      const views = parseInt(row.metricValues?.[3]?.value || "0", 10);
      const duration = parseFloat(row.metricValues?.[4]?.value || "0");
      const bounce = parseFloat(row.metricValues?.[5]?.value || "0");

      totalUsers += users;
      newUsers += newUserCount;
      sessions += sessionCount;
      pageViews += views;
      totalDuration += duration;
      totalBounceRate += bounce;

      const device = row.dimensionValues?.[1]?.value || "";
      if (device === "desktop") deviceBreakdown.desktop += sessionCount;
      else if (device === "mobile") deviceBreakdown.mobile += sessionCount;
      else if (device === "tablet") deviceBreakdown.tablet += sessionCount;

      const source = row.dimensionValues?.[2]?.value || "direct";
      referrers[source] = (referrers[source] || 0) + sessionCount;
    });

    // Process events
    const events: Record<string, number> = {};
    eventsResponse.rows?.forEach((row) => {
      const eventName = row.dimensionValues?.[0]?.value || "";
      const count = parseInt(row.metricValues?.[0]?.value || "0", 10);
      events[eventName] = count;
    });

    // Process top pages
    const topPages =
      pagesResponse.rows?.map((row) => ({
        path: row.dimensionValues?.[0]?.value || "",
        views: parseInt(row.metricValues?.[0]?.value || "0", 10),
      })) || [];

    // Process top referrers
    const topReferrers = Object.entries(referrers)
      .map(([source, sessions]) => ({ source, sessions }))
      .sort((a, b) => b.sessions - a.sessions)
      .slice(0, 10);

    const returningUsers = totalUsers - newUsers;
    const averageSessionDuration = sessions > 0 ? totalDuration / sessions : 0;
    const bounceRate = sessions > 0 ? totalBounceRate / sessions : 0;

    // Calculate conversion rates
    const formSubmissions = events["form_submit"] || 0;
    const formStarts = events["form_step"] || 0;
    const formCompletionRate =
      formStarts > 0 ? (formSubmissions / formStarts) * 100 : 0;
    const leadConversionRate =
      sessions > 0 ? (formSubmissions / sessions) * 100 : 0;

    return {
      totalUsers,
      newUsers,
      returningUsers,
      sessions,
      pageViews,
      averageSessionDuration,
      bounceRate: bounceRate * 100, // Convert to percentage
      formSubmissions,
      newsletterSubscriptions: events["newsletter_subscribe"] || 0,
      productViews: events["product_view"] || 0,
      downloads: events["file_download"] || 0,
      whatsappClicks: events["whatsapp_click"] || 0,
      phoneClicks: events["phone_click"] || 0,
      emailClicks: events["email_click"] || 0,
      leadConversionRate,
      formCompletionRate,
      topPages,
      topReferrers,
      deviceBreakdown,
      startDate,
      endDate,
      period: "month",
    };
  } catch (error) {
    console.error("Error fetching KPI metrics:", error);
    throw error;
  }
}

/**
 * Generate insights from KPI metrics by comparing with previous period
 */
export async function generateInsights(
  currentMetrics: KPIMetrics,
  previousMetrics: KPIMetrics
): Promise<AnalyticsInsight[]> {
  const insights: AnalyticsInsight[] = [];

  // Traffic insights
  const userChange =
    previousMetrics.totalUsers > 0
      ? ((currentMetrics.totalUsers - previousMetrics.totalUsers) /
          previousMetrics.totalUsers) *
        100
      : 0;

  if (Math.abs(userChange) > 10) {
    insights.push({
      type: userChange > 0 ? "positive" : "negative",
      title: `User Traffic ${userChange > 0 ? "Increased" : "Decreased"}`,
      description: `Total users ${userChange > 0 ? "increased" : "decreased"} by ${Math.abs(userChange).toFixed(1)}% compared to the previous period.`,
      metric: "totalUsers",
      change: userChange,
      recommendation:
        userChange < 0
          ? "Review marketing campaigns and SEO performance. Consider content updates or promotional activities."
          : "Leverage the traffic increase with targeted CTAs and conversion optimization.",
    });
  }

  // Conversion insights
  const conversionChange =
    previousMetrics.leadConversionRate > 0
      ? ((currentMetrics.leadConversionRate -
          previousMetrics.leadConversionRate) /
          previousMetrics.leadConversionRate) *
        100
      : 0;

  if (Math.abs(conversionChange) > 15) {
    insights.push({
      type: conversionChange > 0 ? "positive" : "negative",
      title: `Conversion Rate ${conversionChange > 0 ? "Improved" : "Declined"}`,
      description: `Lead conversion rate ${conversionChange > 0 ? "improved" : "declined"} by ${Math.abs(conversionChange).toFixed(1)}%.`,
      metric: "leadConversionRate",
      change: conversionChange,
      recommendation:
        conversionChange < 0
          ? "Review form UX, reduce friction, and test different CTA placements."
          : "Analyze what's working and replicate successful patterns across the site.",
    });
  }

  // Bounce rate insights
  const bounceChange =
    currentMetrics.bounceRate - previousMetrics.bounceRate;

  if (Math.abs(bounceChange) > 5) {
    insights.push({
      type: bounceChange < 0 ? "positive" : "negative",
      title: `Bounce Rate ${bounceChange < 0 ? "Improved" : "Increased"}`,
      description: `Bounce rate ${bounceChange < 0 ? "decreased" : "increased"} by ${Math.abs(bounceChange).toFixed(1)} percentage points.`,
      metric: "bounceRate",
      change: bounceChange,
      recommendation:
        bounceChange > 0
          ? "Improve page load times, enhance content relevance, and optimize landing pages."
          : "Continue optimizing user experience and content quality.",
    });
  }

  // Engagement insights
  const engagementChange =
    previousMetrics.formSubmissions > 0
      ? ((currentMetrics.formSubmissions - previousMetrics.formSubmissions) /
          previousMetrics.formSubmissions) *
        100
      : 0;

  if (Math.abs(engagementChange) > 20) {
    insights.push({
      type: engagementChange > 0 ? "positive" : "negative",
      title: `Form Submissions ${engagementChange > 0 ? "Increased" : "Decreased"}`,
      description: `Form submissions ${engagementChange > 0 ? "increased" : "decreased"} by ${Math.abs(engagementChange).toFixed(1)}%.`,
      metric: "formSubmissions",
      change: engagementChange,
      recommendation:
        engagementChange < 0
          ? "Review form placement, simplify form fields, and test different form designs."
          : "Capitalize on increased engagement with follow-up campaigns.",
    });
  }

  return insights;
}

/**
 * Detect anomalies in metrics
 */
export function detectAnomalies(
  currentMetrics: KPIMetrics,
  historicalAverage: KPIMetrics
): AnalyticsInsight[] {
  const anomalies: AnalyticsInsight[] = [];

  // Check for significant drops in traffic
  const trafficDrop =
    ((currentMetrics.totalUsers - historicalAverage.totalUsers) /
      historicalAverage.totalUsers) *
    100;

  if (trafficDrop < -30) {
    anomalies.push({
      type: "negative",
      title: "Traffic Anomaly Detected",
      description: `Traffic dropped by ${Math.abs(trafficDrop).toFixed(1)}% compared to historical average. This may indicate an issue.`,
      metric: "totalUsers",
      change: trafficDrop,
      recommendation:
        "Check for technical issues, SEO penalties, or marketing campaign changes. Review server logs and error tracking.",
    });
  }

  // Check for conversion rate anomalies
  const conversionDrop =
    currentMetrics.leadConversionRate - historicalAverage.leadConversionRate;

  if (conversionDrop < -20) {
    anomalies.push({
      type: "negative",
      title: "Conversion Rate Anomaly",
      description: `Conversion rate dropped by ${Math.abs(conversionDrop).toFixed(1)} percentage points.`,
      metric: "leadConversionRate",
      change: conversionDrop,
      recommendation:
        "Review form functionality, check for broken links, and test user flows. Verify CRM integration is working.",
    });
  }

  return anomalies;
}

