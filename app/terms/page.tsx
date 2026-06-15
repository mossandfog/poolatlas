import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Terms of Service | Pool Atlas",
  description: "Pool Atlas terms of service - the rules and guidelines for using our website.",
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: March 2026</p>
          
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using Pool Atlas (poolatlas.io), you accept and agree to be bound by the terms and 
                conditions of this agreement. If you do not agree to these terms, please do not use our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Use of Content</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on Pool Atlas, including but not limited to text, graphics, logos, images, and rankings, 
                is the property of Pool Atlas and is protected by copyright laws. You may not reproduce, distribute, 
                or create derivative works without our prior written consent.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Hotels and resorts featured in our rankings may use our embeddable badges in accordance with our 
                badge usage guidelines available on our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Rankings and Reviews</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our rankings are compiled from publicly available reviews, expert assessments, and proprietary 
                evaluation criteria. Rankings are editorial in nature and represent our independent assessment. 
                We do not accept payment for rankings or placement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Third-Party Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website may contain links to third-party websites, including hotel booking platforms. These links 
                are provided for your convenience, and we are not responsible for the content or practices of these 
                external sites. Some links may be affiliate links through which we earn a commission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. User Submissions</h2>
              <p className="text-muted-foreground leading-relaxed">
                By submitting a pool for consideration or any other content to Pool Atlas, you grant us a non-exclusive, 
                royalty-free license to use, reproduce, and publish that content in connection with our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                Pool Atlas provides information for entertainment and informational purposes only. We make no warranties 
                or representations about the accuracy or completeness of the content. Hotel amenities, availability, 
                and conditions may change without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                Pool Atlas shall not be liable for any indirect, incidental, special, or consequential damages arising 
                from your use of our website or reliance on any information provided.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon 
                posting. Your continued use of the website constitutes acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms of Service, contact us at{" "}
                <a href="mailto:hello@poolatlas.io" className="text-primary hover:underline">hello@poolatlas.io</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
