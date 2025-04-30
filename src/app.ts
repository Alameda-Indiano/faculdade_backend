import cors from 'cors';
import express from 'express';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import frequencyRoutes from './routes/frequency.routes';
import subscriptionRoutes from './routes/subscription.routes';
import paymentHistoryRoutes from './routes/payment-history.routes';

const app = express();

app.use(express.json());
app.use(cors({
	origin: '*',
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/frequencies', frequencyRoutes);
app.use('/subscriptions', subscriptionRoutes);
app.use('/payment-histories', paymentHistoryRoutes);

export default app;