import { Hero } from "@/components/Hero";
import { BrandIntro } from "@/components/BrandIntro";
import { ClassPreview } from "@/components/ClassPreview";
import { GalleryHighlight } from "@/components/GalleryHighlight";
import { DirectorPreview } from "@/components/DirectorPreview";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { CTASection } from "@/components/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <BrandIntro />
      <ClassPreview />
      <GalleryHighlight />
      <DirectorPreview />
      <Testimonials />
      <FAQ />
      <CTASection />
    </div>
  );
}
