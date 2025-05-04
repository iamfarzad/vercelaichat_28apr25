import { Globe } from "@/components/magicui/globe";
// ...other imports

export function HeroSection() {
  return (
    <section className="hero-section">
      {/* ...existing hero content... */}
      <div className="flex justify-center py-8">
        <Globe />
      </div>
      {/* ...rest of hero content... */}
    </section>
  );
}
