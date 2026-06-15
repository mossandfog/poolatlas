import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Privacy Policy | Pool Atlas",
  description: "Pool Atlas privacy policy - how we collect, use, and protect your information.",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: March 2026</p>
          
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed">
                Pool Atlas collects information you provide directly to us, such as when you subscribe to our newsletter, 
                submit a pool for consideration, or contact us. This may include your name, email address, and any other 
                information you choose to provide.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We also automatically collect certain information when you visit our website, including your IP address, 
                browser type, operating system, referring URLs, and information about how you interact with our site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use the information we collect to operate and improve our services, send you updates and newsletters 
                (if you&apos;ve subscribed), respond to your inquiries, and analyze usage patterns to enhance user experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Information Sharing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
                except as required by law or as necessary to provide our services (such as email delivery providers).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to analyze trends, administer the website, track users&apos; 
                movements around the site, and gather demographic information. You can control the use of cookies through 
                your browser settings and our cookie consent preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate security measures to protect your personal information. However, no method of 
                transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to access, correct, or delete your personal information. You may also opt out of 
                receiving marketing communications at any time by clicking the unsubscribe link in our emails or 
                contacting us at hello@poolatlas.io.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at{" "}
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
