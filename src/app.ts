import cors from 'cors';
import express from 'express';

import authRoutes from './routes/auth.routes';
import bodyMeasurementRoutes from './routes/bodyMeasurement.routes';
import classeRoutes from './routes/classe.routes';
import frequencyRoutes from './routes/frequency.routes';
import paymentHistoryRoutes from './routes/payment-history.routes';
import statusRoutes from './routes/status.routes';
import subscriptionRoutes from './routes/subscription.routes';
import userRoutes from './routes/user.routes';
import userToClasseRoutes from './routes/userToClasse.routes';
const app = express();

app.use(express.json());
app.use(cors({
	origin: '*',
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/classe', classeRoutes);
app.use('/body-measurement', bodyMeasurementRoutes);
app.use('/user-classe', userToClasseRoutes);
app.use('/frequencies', frequencyRoutes);
app.use('/subscriptions', subscriptionRoutes);
app.use('/payment-histories', paymentHistoryRoutes);
app.use('/status', statusRoutes)

export default app;