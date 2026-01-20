import { Container } from "@/shared/ui/container";

export default function ContactPage() {
  return (
    <div className="py-20 bg-brand-cream min-h-screen">
      <Container className="max-w-3xl space-y-8">
        <h1 className="font-montserrat font-bold text-4xl text-brand-teal">Contact Us</h1>
        <p className="text-lg text-brand-charcoal/80">
          We&apos;d love to hear from you. Whether you have a question about our products, shipping, or just want to say hello.
        </p>
        <div className="bg-white p-8 rounded-sm shadow-sm border border-brand-teal/5">
            <p className="mb-4"><strong>Email:</strong> hello@saudade.ie</p>
            <p className="mb-4"><strong>Instagram:</strong> @saudademoda</p>
            <p><strong>Address:</strong> Dublin, Ireland</p>
        </div>
      </Container>
    </div>
  );
}
