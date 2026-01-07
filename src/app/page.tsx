import { Hero } from "@/components/Hero";
import { GallerySection } from "@/components/GallerySection";
import { TimetableSection } from "@/components/TimetableSection";
import { getSiteConfig } from "@/lib/getSiteConfig";

export default async function Home() {
  const config = await getSiteConfig();

  return (
    <div className="flex flex-col min-h-screen">
      <Hero
      // Small top: "예술이 되는 글씨..."
      // Big bottom: "글씨인아트센터"

      // If I map hero_title -> prop title (Big), and hero_subtitle -> prop subtitle (Small)
      // Then:
      // title='예술이 되는 글씨...' (Big)
      // subtitle='글씨인아트센터' (Small)
      // Result: "글씨인아트센터" (Small on top) / "예술이 되는 글씨..." (Big on bottom)
      // This REVERSES the current design.

      // Current Design:
      // Small: "예술이 되는..."
      // Big: "글씨인아트센터"

      // So I should map:
      // prop title (Big) = config.hero_subtitle ('글씨인아트센터')
      // prop subtitle (Small) = config.hero_title ('예술이 되는...')
      />
      <GallerySection />
      <TimetableSection />
    </div>
  );
}
