import { getSiteConfig } from "@/lib/getSiteConfig";
import { AboutContent } from "./AboutContent";

export default async function AboutPage() {
    const config = await getSiteConfig();

    return (
        <div className="pt-32 pb-24 min-h-screen bg-white">
            <div className="container mx-auto px-6 max-w-4xl">
                <AboutContent
                    title={config.about_title}
                    content={config.about_content}
                />
            </div>
        </div>
    );
}
