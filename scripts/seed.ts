import { supabase } from '../src/config/supabase.js';

interface UNESCO_WHS_Response {
    total_count: number;
    results: UNESCO_WHS_Record[];
};

interface UNESCO_WHS_Record {
    id_no: string;
    name_en: string;
    name_zh: string;
    category: string;
    region: string;
    iso_codes: string;
    date_inscribed: string;
    short_description_en: string;
    short_description_zh: string;
};

seed();

async function seed() {
    try {
        const rawData = await fetchAllWorldHeritageSites();
        const formattedData = rawData.map(record => {
            const { id_no, name_en, name_zh, category, region, iso_codes, date_inscribed, short_description_en, short_description_zh } = record;
            return {
                id_no,
                name_en,
                name_zh,
                category,
                region,
                iso_codes,
                date_inscribed,
                desc_en: short_description_en,
                desc_zh: short_description_zh,
            }
        });

        const { error } = await supabase
            .from('sites')
            .upsert(formattedData, {
                onConflict: 'id_no',
            });

        if (error) throw error;

        console.log('🚀 所有世界遺產資料已同步完成！');
    } catch (error) {
        console.error('🔥 Seed 過程中發生錯誤:', error);
    } finally {
        process.exit(0);
    }
}

async function fetchAllWorldHeritageSites() {
    const baseUrl = 'https://data.unesco.org/api/explore/v2.1/catalog/datasets/whc001/records';
    const limit = 100;
    let offset = 0;
    let totalRecords = 100;
    const records: UNESCO_WHS_Record[] = [];

    while (totalRecords >= offset) {
        try {
            const response = await fetch(`${baseUrl}?limit=${limit}&offset=${offset}`);
            const data = (await response.json()) as UNESCO_WHS_Response;
            records.push(...data.results);
            // totalRecords = data.total_count;
            offset += limit;
            console.log(`Fetched ${offset} of ${totalRecords} records...`);
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error('Error seeding data:', error);
        }
    }

    return records;
}
