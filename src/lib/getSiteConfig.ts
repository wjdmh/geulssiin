import { createClient } from "./supabase/server";

export async function getSiteConfig() {
    const supabase = await createClient();
    const { data } = await supabase.from('site_config').select('*');

    // Convert array to object map
    const config = data?.reduce((acc: Record<string, string>, curr) => {
        acc[curr.key] = curr.value;
        return acc;
    }, {}) || {};

    return {
        hero_title: config['hero_title'] || '예술이 되는 글씨, 감성이 되는 그림',
        hero_subtitle: config['hero_subtitle'] || '글씨인아트센터',
        about_title: config['about_title'] || '여백 속에 담긴 묵직한 울림',
        about_content: config['about_content'] || '',
    };
}
