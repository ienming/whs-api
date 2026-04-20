import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import apiRouter from './src/routes/index.js';

const app = express();
app.use(cors());
app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});