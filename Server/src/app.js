import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

//routes
import userRouter from './routes/user.route.js'
import familyRouter from './routes/familyMember.route.js'
import medicineRouter from './routes/medicine.route.js'
import smstest from './routes/smstest.route.js'
import notificationRouter from './routes/notifications.route.js'

app.use('/api/v1/user', userRouter);
app.use('/api/v1/family-members', familyRouter);
app.use('/api/v1/medicines', medicineRouter);
app.use('/api/v1/notifications', notificationRouter)
app.use('/api/v1/test', smstest);

import {errorMiddleware} from './middlewares/error.middleware.js'
app.use(errorMiddleware);

export default app;