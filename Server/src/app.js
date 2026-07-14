import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();
app.set('trust proxy', 1);

// Strip accidental surrounding quotes that Render/Vercel dashboards sometimes add
const rawClientUrl = (process.env.CLIENT_URL || '').replace(/^["']|["']$/g, '');

const allowedOrigins = [
  rawClientUrl,
  'http://localhost:5173',
  'http://localhost:5000',
];

console.log('CORS allowed origins:', allowedOrigins);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow server-to-server / curl requests (no Origin header)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.warn('CORS rejected origin:', origin);
    // Return false instead of throwing so the cors package still sends headers
    return callback(null, false);
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

// Handle preflight OPTIONS requests explicitly for all routes
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

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