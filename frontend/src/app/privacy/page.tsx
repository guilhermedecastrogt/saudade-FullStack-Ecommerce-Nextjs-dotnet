import { Container } from "@/shared/ui/container";

export default function PrivacyPage() {
  return (
    <div className="py-20 bg-brand-cream min-h-screen">
      <Container className="max-w-3xl space-y-8">
        <h1 className="font-montserrat font-bold text-4xl text-brand-teal">Privacy Policy</h1>
        <div className="prose prose-lg text-brand-charcoal/80">
          <p>
            At SAUDADE, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information.
          </p>
          <h3>Information We Collect</h3>
          <p>
            We collect information you provide directly to us, such as when you create an account, make a purchase, or sign up for our newsletter.
          </p>
          <h3>How We Use Your Information</h3>
          <p>
            We use your information to process your orders, communicate with you, and improve our services.
          </p>
          <h3>Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact us at hello@saudade.ie.
          </p>
        </div>
      </Container>
    </div>
  );
}
