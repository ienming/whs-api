import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();
app.use(cors());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.get('/api/health', async (request, response) => {
	response.json({ status: 'ok' });
});

app.get('/api/graph', async (request, response) => {
	try {
		const [nodesResult, linksResult] = await Promise.all([
			supabase.from('sites').select('id, name, category'),
			supabase.from('site_links').select('source_id, target_id')
		]);
	
		if (nodesResult.error || linksResult.error) {
			throw new Error(nodesResult.error?.message || linksResult.error?.message || 'Unknown error');
		}
	
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
	
		response.json(d3Data);
	} catch(error) {
		console.error(error);
		response.status(500).json({
			error: error.message
		});
	}
})

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});