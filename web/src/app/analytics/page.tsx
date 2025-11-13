"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import type { KPIMetrics, AnalyticsInsight } from "@/lib/analytics/reporting";
import { RefreshCw, TrendingUp, TrendingDown, AlertCircle, Users, MousePointerClick, FileText, Phone, Mail, MessageCircle } from "lucide-react";

interface InsightsData {
  currentPeriod: KPIMetrics;
  previousPeriod: KPIMetrics | null;
  insights: AnalyticsInsight[];
  anomalies: AnalyticsInsight[];
  generatedAt: string;
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<InsightsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      });

      const response = await fetch(`/api/analytics/insights?${params.toString()}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch analytics data");
      }

      setData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      console.error("Error fetching analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num >= 0 ? "+" : ""}${num.toFixed(1)}%`;
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  if (loading) {
    return (
      <Container className="py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading analytics data...</p>
          </div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-12">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <h2 className="text-lg font-semibold">Error Loading Analytics</h2>
          </div>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={fetchData} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </Container>
    );
  }

  if (!data) {
    return null;
  }

  const metrics = data.currentPeriod;
  const previous = data.previousPeriod;

  return (
    <Container className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Track KPIs, insights, and performance metrics
        </p>
      </div>

      {/* Date Range Selector */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Start Date</label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, startDate: e.target.value })
              }
              className="px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">End Date</label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, endDate: e.target.value })
              }
              className="px-3 py-2 border rounded-md"
            />
          </div>
        </div>
        <Button onClick={fetchData} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Anomalies Alert */}
      {data.anomalies.length > 0 && (
        <div className="mb-6 bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <h3 className="font-semibold">Anomalies Detected</h3>
          </div>
          {data.anomalies.map((anomaly, idx) => (
            <div key={idx} className="mb-2 last:mb-0">
              <p className="font-medium">{anomaly.title}</p>
              <p className="text-sm text-muted-foreground">
                {anomaly.description}
              </p>
              {anomaly.recommendation && (
                <p className="text-sm mt-1">
                  <strong>Recommendation:</strong> {anomaly.recommendation}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Total Users"
          value={formatNumber(metrics.totalUsers)}
          change={
            previous
              ? formatPercentage(
                  ((metrics.totalUsers - previous.totalUsers) /
                    previous.totalUsers) *
                    100
                )
              : undefined
          }
          icon={<Users className="h-5 w-5" />}
        />
        <MetricCard
          title="Sessions"
          value={formatNumber(metrics.sessions)}
          change={
            previous
              ? formatPercentage(
                  ((metrics.sessions - previous.sessions) /
                    previous.sessions) *
                    100
                )
              : undefined
          }
          icon={<MousePointerClick className="h-5 w-5" />}
        />
        <MetricCard
          title="Page Views"
          value={formatNumber(metrics.pageViews)}
          change={
            previous
              ? formatPercentage(
                  ((metrics.pageViews - previous.pageViews) /
                    previous.pageViews) *
                    100
                )
              : undefined
          }
          icon={<FileText className="h-5 w-5" />}
        />
        <MetricCard
          title="Conversion Rate"
          value={`${metrics.leadConversionRate.toFixed(2)}%`}
          change={
            previous
              ? formatPercentage(
                  metrics.leadConversionRate - previous.leadConversionRate
                )
              : undefined
          }
          icon={<TrendingUp className="h-5 w-5" />}
        />
      </div>

      {/* Engagement Metrics */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Engagement Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard
            title="Form Submissions"
            value={formatNumber(metrics.formSubmissions)}
            icon={<FileText className="h-5 w-5" />}
          />
          <MetricCard
            title="Newsletter Signups"
            value={formatNumber(metrics.newsletterSubscriptions)}
            icon={<Mail className="h-5 w-5" />}
          />
          <MetricCard
            title="Product Views"
            value={formatNumber(metrics.productViews)}
            icon={<FileText className="h-5 w-5" />}
          />
          <MetricCard
            title="WhatsApp Clicks"
            value={formatNumber(metrics.whatsappClicks)}
            icon={<MessageCircle className="h-5 w-5" />}
          />
          <MetricCard
            title="Phone Clicks"
            value={formatNumber(metrics.phoneClicks)}
            icon={<Phone className="h-5 w-5" />}
          />
          <MetricCard
            title="Downloads"
            value={formatNumber(metrics.downloads)}
            icon={<FileText className="h-5 w-5" />}
          />
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Performance Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Average Session Duration
              </span>
            </div>
            <p className="text-2xl font-bold">
              {formatDuration(metrics.averageSessionDuration)}
            </p>
          </div>
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Bounce Rate</span>
            </div>
            <p className="text-2xl font-bold">
              {metrics.bounceRate.toFixed(1)}%
            </p>
          </div>
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Form Completion Rate
              </span>
            </div>
            <p className="text-2xl font-bold">
              {metrics.formCompletionRate.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Insights */}
      {data.insights.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Insights</h2>
          <div className="space-y-4">
            {data.insights.map((insight, idx) => (
              <div
                key={idx}
                className={`border rounded-lg p-4 ${
                  insight.type === "positive"
                    ? "bg-green-50 border-green-200"
                    : insight.type === "negative"
                      ? "bg-red-50 border-red-200"
                      : "bg-blue-50 border-blue-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  {insight.type === "positive" ? (
                    <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                  ) : insight.type === "negative" ? (
                    <TrendingDown className="h-5 w-5 text-red-600 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{insight.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {insight.description}
                    </p>
                    {insight.recommendation && (
                      <p className="text-sm">
                        <strong>Recommendation:</strong> {insight.recommendation}
                      </p>
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      insight.type === "positive"
                        ? "text-green-600"
                        : insight.type === "negative"
                          ? "text-red-600"
                          : "text-blue-600"
                    }`}
                  >
                    {formatPercentage(insight.change)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Pages */}
      {metrics.topPages.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Top Pages</h2>
          <div className="bg-card border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Page
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium">
                    Views
                  </th>
                </tr>
              </thead>
              <tbody>
                {metrics.topPages.map((page, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-3">{page.path}</td>
                    <td className="px-4 py-3 text-right">
                      {formatNumber(page.views)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Device Breakdown */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Device Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border rounded-lg p-6">
            <div className="text-sm text-muted-foreground mb-2">Desktop</div>
            <div className="text-2xl font-bold">
              {formatNumber(metrics.deviceBreakdown.desktop)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {metrics.sessions > 0
                ? (
                    (metrics.deviceBreakdown.desktop / metrics.sessions) *
                    100
                  ).toFixed(1)
                : 0}
              % of sessions
            </div>
          </div>
          <div className="bg-card border rounded-lg p-6">
            <div className="text-sm text-muted-foreground mb-2">Mobile</div>
            <div className="text-2xl font-bold">
              {formatNumber(metrics.deviceBreakdown.mobile)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {metrics.sessions > 0
                ? (
                    (metrics.deviceBreakdown.mobile / metrics.sessions) * 100
                  ).toFixed(1)
                : 0}
              % of sessions
            </div>
          </div>
          <div className="bg-card border rounded-lg p-6">
            <div className="text-sm text-muted-foreground mb-2">Tablet</div>
            <div className="text-2xl font-bold">
              {formatNumber(metrics.deviceBreakdown.tablet)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {metrics.sessions > 0
                ? (
                    (metrics.deviceBreakdown.tablet / metrics.sessions) * 100
                  ).toFixed(1)
                : 0}
              % of sessions
            </div>
          </div>
        </div>
      </div>

      {/* Generated At */}
      <div className="text-sm text-muted-foreground text-center">
        Last updated: {new Date(data.generatedAt).toLocaleString()}
      </div>
    </Container>
  );
}

function MetricCard({
  title,
  value,
  change,
  icon,
}: {
  title: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
}) {
  const isPositive = change && !change.startsWith("-");

  return (
    <div className="bg-card border rounded-lg p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">{title}</span>
        <div className="text-muted-foreground">{icon}</div>
      </div>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold">{value}</p>
        {change && (
          <span
            className={`text-sm font-medium ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {change}
          </span>
        )}
      </div>
    </div>
  );
}

