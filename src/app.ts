import cors from 'cors';
import express from 'express';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

const app = express();

app.use(express.json());
app.use(cors({
	origin: '*',
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

export default app;