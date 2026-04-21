import { supabase } from "../config/supabase.js";

export const fetchAndFormatGraph = async () => {
    const MAX_LIMIT = 50;
    const [nodesResult, linksResult] = await Promise.all([
        supabase.from('sites').select('id_no, name_en, category, desc_en').limit(MAX_LIMIT),
        supabase.from('site_links').select('source_id, target_id, strength').limit(MAX_LIMIT),
    ]);

    if (nodesResult.error) throw new Error(nodesResult.error.message);
    if (linksResult.error) throw new Error(linksResult.error.message);

    const d3Data = {
        nodes: nodesResult.data.map(node => ({
            id: node.id_no,
            name_en: node.name_en,
            desc_en: node.desc_en,
            category: node.category,
        })),
        links: linksResult.data.map(link => ({
            source: link.source_id,
            target: link.target_id,
            value: link.strength,
        }))
    };

    return d3Data;
}