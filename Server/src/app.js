import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();

// Normalize CLIENT_URL: strip trailing slash to match browser's Origin header
const clientUrl = process.env.CLIENT_URL?.replace(/\/+$/, '');
const allowedOrigins = [clientUrl, "http://localhost:5173"].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests without an origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.warn(`CORS blocked origin: "${origin}" | Allowed: ${JSON.stringify(allowedOrigins)}`);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
  'Content-Type',
  'Authorization',
  'X-Requested-With'
  ],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

//routes
import userRouter from './routes/user.route.js'
import familyRouter from './routes/familyMember.route.js'
import medicineRouter from './routes/medicine.route.js'
import smstest from './routes/smstest.route.js'
import notificationRouter from './routes/notifications.route.js'

app.get("/api/v1/health", (req, res) => {
  res.status(200).send("OK");
});

app.use('/api/v1/user', userRouter);
app.use('/api/v1/family-members', familyRouter);
app.use('/api/v1/medicines', medicineRouter);
app.use('/api/v1/notifications', notificationRouter)
app.use('/api/v1/test', smstest);

import { errorMiddleware } from './middlewares/error.middleware.js'
app.use(errorMiddleware);

export default app;