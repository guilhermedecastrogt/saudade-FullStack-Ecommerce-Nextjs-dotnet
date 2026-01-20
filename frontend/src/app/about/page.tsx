import { Container } from "@/shared/ui/container";

export default function AboutPage() {
  return (
    <div className="py-20 bg-brand-cream min-h-screen">
      <Container className="max-w-3xl space-y-8">
        <h1 className="font-montserrat font-bold text-4xl text-brand-teal">About Saudade</h1>
        <div className="prose prose-lg text-brand-charcoal/80">
          <p>
            SAUDADE is a Brazilian fashion brand for women who long for connection, quality, and home.
            We bring authentic Brazilian fashion to Dublin and beyond.
          </p>
          <p>
            &ldquo;Saudade&rdquo; is a Portuguese word that has no direct translation in English. It describes a deep emotional state of nostalgic or profound melancholic longing for an absent something or someone that one loves.
          </p>
          <p>
            Our mission is to bring that warmth and feeling of home to you through carefully curated pieces that blend tropical vibrancy with European sophistication.
          </p>
        </div>
      </Container>
    </div>
  );
}
