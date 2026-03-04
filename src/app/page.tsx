import { Hero } from "@/components/Hero";
import { BrandIntro } from "@/components/BrandIntro";
import { GalleryHighlight } from "@/components/GalleryHighlight";
import { ClassPreview } from "@/components/ClassPreview";
import { DirectorPreview } from "@/components/DirectorPreview";
import { CTASection } from "@/components/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <BrandIntro />
      <GalleryHighlight />
      <ClassPreview />
      <DirectorPreview />
      <CTASection />
    </div>
  );
}
