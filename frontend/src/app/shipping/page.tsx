import { Container } from "@/shared/ui/container";

export default function ShippingPage() {
  return (
    <div className="py-20 bg-brand-cream min-h-screen">
      <Container className="max-w-3xl space-y-8">
        <h1 className="font-montserrat font-bold text-4xl text-brand-teal">Shipping & Returns</h1>
        <div className="prose prose-lg text-brand-charcoal/80">
          <h3>Shipping</h3>
          <p>We ship to Ireland and EU countries.</p>
          <ul>
            <li><strong>Ireland:</strong> 2-3 business days (€5.00, Free over €150)</li>
            <li><strong>EU:</strong> 3-5 business days (€15.00)</li>
          </ul>
          
          <h3>Returns</h3>
          <p>
            We accept returns within 30 days of purchase. Items must be unworn, unwashed, and with original tags attached.
          </p>
          <p>
            To initiate a return, please contact us at hello@saudade.ie with your order number.
          </p>
        </div>
      </Container>
    </div>
  );
}
