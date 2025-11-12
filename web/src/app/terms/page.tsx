import { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { SITE_CONFIG, COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Arakal Industries - Terms and conditions for using our website",
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfServicePage() {
  const lastUpdated = "2024-01-01"; // Update this date when the terms change

  return (
    <Container className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto prose prose-lg">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-muted-foreground mb-6">
          <strong>Last Updated:</strong> {lastUpdated}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
          <p className="mb-4">
            By accessing or using {SITE_CONFIG.url} (the "Site"), you agree to be bound by these
            Terms of Service ("Terms"). If you disagree with any part of these Terms, then you may
            not access the Site.
          </p>
          <p className="mb-4">
            These Terms apply to all visitors, users, and others who access or use the Site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
          <p className="mb-4">
            Permission is granted to temporarily access the materials on {COMPANY_INFO.name}'s
            website for personal, non-commercial transitory viewing only. This is the grant of a
            license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to reverse engineer any software contained on the Site</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other
              server</li>
          </ul>
          <p className="mb-4">
            This license shall automatically terminate if you violate any of these restrictions and
            may be terminated by {COMPANY_INFO.name} at any time.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Disclaimer</h2>
          <p className="mb-4">
            The materials on {COMPANY_INFO.name}'s website are provided on an "as is" basis.
            {COMPANY_INFO.name} makes no warranties, expressed or implied, and hereby disclaims and
            negates all other warranties including, without limitation, implied warranties or
            conditions of merchantability, fitness for a particular purpose, or non-infringement of
            intellectual property or other violation of rights.
          </p>
          <p className="mb-4">
            Further, {COMPANY_INFO.name} does not warrant or make any representations concerning
            the accuracy, likely results, or reliability of the use of the materials on its website
            or otherwise relating to such materials or on any sites linked to this site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Limitations</h2>
          <p className="mb-4">
            In no event shall {COMPANY_INFO.name} or its suppliers be liable for any damages
            (including, without limitation, damages for loss of data or profit, or due to business
            interruption) arising out of the use or inability to use the materials on{" "}
            {COMPANY_INFO.name}'s website, even if {COMPANY_INFO.name} or a {COMPANY_INFO.name}{" "}
            authorized representative has been notified orally or in writing of the possibility of
            such damage.
          </p>
          <p className="mb-4">
            Because some jurisdictions do not allow limitations on implied warranties, or
            limitations of liability for consequential or incidental damages, these limitations may
            not apply to you.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Accuracy of Materials</h2>
          <p className="mb-4">
            The materials appearing on {COMPANY_INFO.name}'s website could include technical,
            typographical, or photographic errors. {COMPANY_INFO.name} does not warrant that any of
            the materials on its website are accurate, complete, or current.
            {COMPANY_INFO.name} may make changes to the materials contained on its website at any
            time without notice. However, {COMPANY_INFO.name} does not make any commitment to
            update the materials.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Links</h2>
          <p className="mb-4">
            {COMPANY_INFO.name} has not reviewed all of the sites linked to its website and is not
            responsible for the contents of any such linked site. The inclusion of any link does
            not imply endorsement by {COMPANY_INFO.name} of the site. Use of any such linked
            website is at the user's own risk.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Modifications</h2>
          <p className="mb-4">
            {COMPANY_INFO.name} may revise these Terms of Service for its website at any time
            without notice. By using this website you are agreeing to be bound by the then current
            version of these Terms of Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
          <p className="mb-4">
            These Terms and Conditions are governed by and construed in accordance with the laws of
            India and you irrevocably submit to the exclusive jurisdiction of the courts in
            Solapur, Maharashtra, India.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
          <p className="mb-4">
            If you have any questions about these Terms of Service, please contact us:
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
