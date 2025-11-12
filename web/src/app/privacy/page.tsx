import { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { SITE_CONFIG, COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Arakal Industries - How we collect, use, and protect your personal information",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "2024-01-01"; // Update this date when the policy changes

  return (
    <Container className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto prose prose-lg">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground mb-6">
          <strong>Last Updated:</strong> {lastUpdated}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            {COMPANY_INFO.name} ("we," "our," or "us") is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website {SITE_CONFIG.url} (the "Site").
          </p>
          <p className="mb-4">
            Please read this Privacy Policy carefully. If you do not agree with the terms of this
            Privacy Policy, please do not access the Site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          <h3 className="text-xl font-semibold mb-3">2.1 Personal Information</h3>
          <p className="mb-4">
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Fill out a contact form or request a quote</li>
            <li>Subscribe to our newsletter</li>
            <li>Contact us via email or phone</li>
            <li>Register for an account (if applicable)</li>
          </ul>
          <p className="mb-4">
            This information may include your name, email address, phone number, company name,
            mailing address, and any other information you choose to provide.
          </p>

          <h3 className="text-xl font-semibold mb-3">2.2 Automatically Collected Information</h3>
          <p className="mb-4">
            When you visit our Site, we may automatically collect certain information about your
            device, including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Pages you visit and time spent on pages</li>
            <li>Referring website addresses</li>
            <li>Date and time of your visit</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p className="mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Respond to your inquiries and provide customer support</li>
            <li>Process your requests and transactions</li>
            <li>Send you marketing communications (with your consent)</li>
            <li>Improve our website and services</li>
            <li>Analyze website usage and trends</li>
            <li>Comply with legal obligations</li>
            <li>Protect our rights and prevent fraud</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Information Sharing and Disclosure</h2>
          <p className="mb-4">
            We do not sell, trade, or rent your personal information to third parties. We may share
            your information with:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Service Providers:</strong> Third-party vendors who perform services on our
              behalf, such as hosting, analytics, email delivery, and customer relationship
              management (CRM)
            </li>
            <li>
              <strong>Business Partners:</strong> Trusted partners who assist us in operating our
              website and conducting our business
            </li>
            <li>
              <strong>Legal Requirements:</strong> When required by law or to protect our rights
              and safety
            </li>
            <li>
              <strong>Business Transfers:</strong> In connection with a merger, acquisition, or
              sale of assets
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Cookies and Tracking Technologies</h2>
          <p className="mb-4">
            We use cookies and similar tracking technologies to track activity on our Site and hold
            certain information. Cookies are files with a small amount of data which may include an
            anonymous unique identifier.
          </p>
          <p className="mb-4">
            You can instruct your browser to refuse all cookies or to indicate when a cookie is
            being sent. However, if you do not accept cookies, you may not be able to use some
            portions of our Site.
          </p>
          <p className="mb-4">
            We use the following types of cookies:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Essential Cookies:</strong> Required for the Site to function properly
            </li>
            <li>
              <strong>Analytics Cookies:</strong> Help us understand how visitors interact with our
              Site (e.g., Google Analytics)
            </li>
            <li>
              <strong>Marketing Cookies:</strong> Used to track visitors across websites for
              marketing purposes (with your consent)
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
          <p className="mb-4">
            We implement appropriate technical and organizational security measures to protect your
            personal information against unauthorized access, alteration, disclosure, or
            destruction. However, no method of transmission over the Internet or electronic storage
            is 100% secure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
          <p className="mb-4">Depending on your location, you may have the following rights:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Access:</strong> Request access to your personal information
            </li>
            <li>
              <strong>Rectification:</strong> Request correction of inaccurate information
            </li>
            <li>
              <strong>Erasure:</strong> Request deletion of your personal information
            </li>
            <li>
              <strong>Restriction:</strong> Request restriction of processing of your information
            </li>
            <li>
              <strong>Portability:</strong> Request transfer of your information to another service
            </li>
            <li>
              <strong>Objection:</strong> Object to processing of your information
            </li>
            <li>
              <strong>Withdraw Consent:</strong> Withdraw consent at any time where we rely on
              consent to process your information
            </li>
          </ul>
          <p className="mb-4">
            To exercise these rights, please contact us at {COMPANY_INFO.contact.email} or{" "}
            {COMPANY_INFO.contact.phone}.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Data Retention</h2>
          <p className="mb-4">
            We retain your personal information for as long as necessary to fulfill the purposes
            outlined in this Privacy Policy, unless a longer retention period is required or
            permitted by law.
          </p>
          <p className="mb-4">
            When we no longer need your personal information, we will securely delete or anonymize
            it.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Third-Party Services</h2>
          <p className="mb-4">
            Our Site may contain links to third-party websites or services. We are not responsible
            for the privacy practices of these third parties. We encourage you to read the privacy
            policies of any third-party services you use.
          </p>
          <p className="mb-4">We use the following third-party services:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Google Analytics:</strong> For website analytics (see Google's Privacy
              Policy)
            </li>
            <li>
              <strong>Google Tag Manager:</strong> For tag management (see Google's Privacy Policy)
            </li>
            <li>
              <strong>Hotjar:</strong> For website heatmaps and session replay (see Hotjar's
              Privacy Policy)
            </li>
            <li>
              <strong>HubSpot:</strong> For customer relationship management (see HubSpot's Privacy
              Policy)
            </li>
            <li>
              <strong>Resend:</strong> For email delivery (see Resend's Privacy Policy)
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Children's Privacy</h2>
          <p className="mb-4">
            Our Site is not intended for children under the age of 18. We do not knowingly collect
            personal information from children. If you are a parent or guardian and believe your
            child has provided us with personal information, please contact us.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any changes
            by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
          <p className="mb-4">
            You are advised to review this Privacy Policy periodically for any changes. Changes to
            this Privacy Policy are effective when they are posted on this page.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <div className="bg-muted p-6 rounded-lg">
            <p className="mb-2">
              <strong>{COMPANY_INFO.name}</strong>
            </p>
            <p className="mb-2">{COMPANY_INFO.locations[0].address}</p>
            <p className="mb-2">
              <strong>Email:</strong>{" "}
              <a href={`mailto:${COMPANY_INFO.contact.email}`} className="text-primary hover:underline">
                {COMPANY_INFO.contact.email}
              </a>
            </p>
            <p className="mb-2">
              <strong>Phone:</strong>{" "}
              <a href={`tel:${COMPANY_INFO.contact.phone}`} className="text-primary hover:underline">
                {COMPANY_INFO.contact.phone}
              </a>
            </p>
          </div>
        </section>
      </div>
    </Container>
  );
}
