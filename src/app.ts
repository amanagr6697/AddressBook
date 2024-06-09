import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import contactRoutes from './routes/contactRoutes';
import searchRoutes from './routes/searchRoutes';

const app = express();

app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api', contactRoutes);
app.use('/api', searchRoutes);

export default app;
