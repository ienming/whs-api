import { supabase } from "../config/supabase.js";

export const fetchAndFormatGraph = async () => {
    const [nodesResult, linksResult] = await Promise.all([
        supabase.from('sites').select('id, name, category'),
        supabase.from('site_links').select('source_id, target_id')
    ]);

    if (nodesResult.error) throw new Error(nodesResult.error);
    if (linksResult.error) throw new Error(linksResult.error);

    const d3Data = {
        nodes: nodesResult.data.map(node => ({
            id: node.id,
            name: node.name,
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