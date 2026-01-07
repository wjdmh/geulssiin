import { Hero } from "@/components/Hero";
import { GallerySection } from "@/components/GallerySection";
import { TimetableSection } from "@/components/TimetableSection";
import { getSiteConfig } from "@/lib/getSiteConfig";

export default async function Home() {
  const config = await getSiteConfig();

  return (
    <div className="flex flex-col min-h-screen">
      <Hero
        title={config.hero_subtitle} // Note: The UI design treats "subtitle" as the small top text and "title" as the big text.
        // In Hero.tsx: <h2 ...>{subtitle}</h2> <h1 ...>{title}</h1>
        // In SQL: hero_title (big), hero_subtitle (small)
        // BUT in Hero.tsx prop names I used:
        // title (defaults to '글씨인아트센터' - Big)
        // subtitle (defaults to '예술이...' - Small)

        // Let's match them correctly:
        subtitle={config.hero_title} // '예술이 되는...' (Small top text in design often called 'eyebrow' but here 'subtitle')
        title={config.hero_subtitle} // '글씨인아트센터' (Big text)

      // WAIT. In my SQL: 
      // hero_title = '예술이 되는 글씨...' (Currently mapped as BIG text description in prompt? No. 
      // Let's check SQL insert:
      // ('hero_title', '예술이 되는 글씨, 감성이 되는 그림', '메인 화면 큰 문구'), -> This implies USER thinks this is the BIG one?
      // ('hero_subtitle', '글씨인아트센터', '메인 화면 작은 문구'), -> This implies USER thinks this is the SMALL one?

      // Actually, visually:
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
