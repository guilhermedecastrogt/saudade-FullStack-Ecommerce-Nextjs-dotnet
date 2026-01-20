import { HeroSection } from "@/widgets/home/hero-section";
import { FeaturedSection } from "@/widgets/home/featured-section";
import { AboutSection } from "@/widgets/home/about-section";
import { TestimonialsSection } from "@/widgets/home/testimonials-section";
import { USPBar } from "@/widgets/home/usp-bar";
import { CategoryGrid } from "@/widgets/home/category-grid";
import { PromoSection } from "@/widgets/home/promo-section";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <USPBar />
      <CategoryGrid />
      <FeaturedSection />
      <PromoSection />
      <AboutSection />
      <TestimonialsSection />
    </div>
  );
}
