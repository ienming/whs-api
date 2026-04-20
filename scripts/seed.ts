import { supabase } from '../src/config/supabase.js';

interface UNESCO_WHS_Response {
    total_count: number;
    results: UNESCO_WHS_Record[];
};

interface UNESCO_WHS_Record {
    name_en: string;
    name_fr: string;
    name_es: string;
    name_ar: string;
    name_zh: string;
    name_ru: string;
};

seed();

async function seed() {
    try {
        
    } catch (error) {
        
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
