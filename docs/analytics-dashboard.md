# Analytics Dashboard Documentation

## Overview

The Analytics Dashboard provides comprehensive KPI tracking, insights generation, and anomaly detection for the Arakal Industries website. It integrates with Google Analytics 4 (GA4) to provide real-time metrics and actionable insights.

## Features

### 1. KPI Metrics Tracking
- **Traffic Metrics**: Total users, new users, returning users, sessions, page views
- **Engagement Metrics**: Form submissions, newsletter subscriptions, product views, downloads, contact clicks
- **Conversion Metrics**: Lead conversion rate, form completion rate
- **Performance Metrics**: Average session duration, bounce rate
- **Device Breakdown**: Desktop, mobile, tablet usage
- **Top Pages**: Most viewed pages
- **Top Referrers**: Traffic sources

### 2. Insights Generation
- Automatic comparison with previous periods
- Trend analysis (positive/negative/neutral)
- Actionable recommendations
- Percentage change calculations

### 3. Anomaly Detection
- Traffic drop alerts (>30% decrease)
- Conversion rate anomalies (>20% decrease)
- Automated recommendations for investigation

## Setup

### Prerequisites

1. **Google Analytics 4 Property**
   - Create a GA4 property in Google Analytics
   - Note your Property ID (format: `123456789`)

2. **Google Analytics Data API**
   - Enable the Google Analytics Data API in Google Cloud Console
   - Create a service account
   - Download the service account JSON credentials
   - Grant the service account access to your GA4 property

### Environment Variables

Add the following to your `.env.local`:

```bash
# Google Analytics Configuration
GOOGLE_ANALYTICS_PROPERTY_ID=your-property-id
GOOGLE_ANALYTICS_CREDENTIALS='{"type":"service_account","project_id":"...","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}'

# Optional: API Key for dashboard access (recommended for production)
ANALYTICS_API_KEY=your-secure-api-key
```

**Note**: The `GOOGLE_ANALYTICS_CREDENTIALS` should be the full JSON string of your service account credentials. You can either:
- Store it as a JSON string in the environment variable
- Or use a secrets manager (Vercel Secrets, AWS Secrets Manager, etc.)

### Granting Service Account Access

1. Go to Google Analytics → Admin → Property Access Management
2. Click "+" to add a user
3. Enter the service account email (from your credentials JSON)
4. Grant "Viewer" role
5. Save

## Usage

### Accessing the Dashboard

Navigate to `/analytics` in your application. The dashboard will:
- Load the last 30 days of data by default
- Allow you to select custom date ranges
- Refresh data on demand

### API Endpoints

#### GET `/api/analytics/kpis`

Fetch KPI metrics for a date range.

**Query Parameters:**
- `startDate` (optional): Start date in YYYY-MM-DD format (default: 30 days ago)
- `endDate` (optional): End date in YYYY-MM-DD format (default: today)

**Headers:**
- `x-api-key` (optional): API key for authentication (if `ANALYTICS_API_KEY` is set)

**Example:**
```bash
curl "http://localhost:8001/api/analytics/kpis?startDate=2024-01-01&endDate=2024-01-31" \
  -H "x-api-key: your-api-key"
```

#### GET `/api/analytics/insights`

Generate insights and detect anomalies.

**Query Parameters:**
- `startDate` (optional): Start date in YYYY-MM-DD format
- `endDate` (optional): End date in YYYY-MM-DD format
- `compareWithPrevious` (optional): Compare with previous period (default: true)

**Example:**
```bash
curl "http://localhost:8001/api/analytics/insights?startDate=2024-01-01&endDate=2024-01-31" \
  -H "x-api-key: your-api-key"
```

## KPIs Tracked

### Traffic Metrics
- **Total Users**: Unique visitors
- **New Users**: First-time visitors
- **Returning Users**: Repeat visitors
- **Sessions**: Total sessions
- **Page Views**: Total page views

### Engagement Metrics
- **Form Submissions**: RFQ form completions
- **Newsletter Subscriptions**: Email signups
- **Product Views**: Product page views
- **Downloads**: File downloads (brochures, resources)
- **WhatsApp Clicks**: WhatsApp button clicks
- **Phone Clicks**: Phone number clicks
- **Email Clicks**: Email address clicks

### Conversion Metrics
- **Lead Conversion Rate**: (Form Submissions / Sessions) × 100
- **Form Completion Rate**: (Form Submissions / Form Starts) × 100

### Performance Metrics
- **Average Session Duration**: Average time per session
- **Bounce Rate**: Percentage of single-page sessions

## Insights Types

### Positive Insights
- Traffic increases
- Conversion rate improvements
- Engagement increases
- Bounce rate decreases

### Negative Insights
- Traffic decreases
- Conversion rate declines
- Engagement drops
- Bounce rate increases

### Neutral Insights
- Stable metrics
- No significant changes

## Anomaly Detection

The system automatically detects:
- **Traffic Anomalies**: >30% drop compared to historical average
- **Conversion Anomalies**: >20 percentage point drop in conversion rate

When anomalies are detected:
1. Alert is displayed prominently on the dashboard
2. Recommendations are provided
3. Investigation steps are suggested

## Monthly Review Process

### Step 1: Access Dashboard
Navigate to `/analytics` and review the current period metrics.

### Step 2: Review Insights
- Check positive trends to identify what's working
- Review negative trends to identify areas for improvement
- Note any anomalies that require investigation

### Step 3: Compare Periods
- Use the date range selector to compare different periods
- Review month-over-month changes
- Identify seasonal patterns

### Step 4: Generate Report
- Export data via API if needed
- Document key findings
- Share insights with stakeholders

### Step 5: Action Items
- Create optimization tasks based on insights
- Prioritize improvements
- Track progress in next review

## Best Practices

1. **Regular Reviews**: Review analytics weekly or monthly
2. **Set Baselines**: Establish baseline metrics for comparison
3. **Track Goals**: Set specific goals for KPIs
4. **Investigate Anomalies**: Always investigate detected anomalies
5. **Document Insights**: Keep a log of insights and actions taken
6. **Share Findings**: Share insights with the team regularly

## Troubleshooting

### "Analytics not configured" Error
- Verify `GOOGLE_ANALYTICS_PROPERTY_ID` is set
- Verify `GOOGLE_ANALYTICS_CREDENTIALS` is valid JSON
- Check service account has access to GA4 property

### "Unauthorized" Error
- Verify `ANALYTICS_API_KEY` matches the header value
- Or remove API key requirement for development

### No Data Showing
- Verify GA4 property is receiving data
- Check date range is correct
- Ensure events are being tracked properly
- Verify service account permissions

### Slow Loading
- Large date ranges may take time to process
- Consider caching results for frequently accessed periods
- Use smaller date ranges for faster responses

## Security Considerations

1. **API Key Protection**: Use environment variables, never commit API keys
2. **Service Account**: Use least-privilege access (Viewer role only)
3. **Rate Limiting**: Consider adding rate limiting to API endpoints
4. **Access Control**: Restrict dashboard access in production (add authentication)
5. **Data Privacy**: Ensure compliance with GDPR and other privacy regulations

## Future Enhancements

- [ ] Automated monthly report generation
- [ ] Email alerts for anomalies
- [ ] Custom date range presets (last week, last month, last quarter)
- [ ] Export to PDF/CSV
- [ ] Scheduled reports
- [ ] Custom KPI definitions
- [ ] Goal tracking
- [ ] Cohort analysis
- [ ] Funnel visualization
- [ ] Real-time dashboard updates

## Related Documentation

- [Analytics Implementation](./tech-stack.md#analytics--tag-management)
- [Event Tracking](./tech-stack.md#analytics--tag-management)
- [Consent Management](../web/src/lib/consent.ts)

