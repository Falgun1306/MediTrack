import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();
const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:5173"];
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests without an origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  optionsSuccessStatus: 200,
}));
console.log('CORS allowed origins:', allowedOrigins);

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

import { errorMiddleware } from './middlewares/error.middleware.js'
app.use(errorMiddleware);

export default app;