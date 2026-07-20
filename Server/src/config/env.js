import 'dotenv/config';

const env = {
    PORT: process.env.PORT || 3000,
    MONGODB_URL: process.env.MONGODB_URL,
    COOKIE_EXPIRES: process.env.COOKIE_EXPIRES,
    JWT_SECRETE: process.env.JWT_SECRETE,
    JWT_EXPIRES: process.env.JWT_EXPIRES,
    NODE_ENV: process.env.NODE_ENV || 'development',
    CLIENT_URL: process.env.CLIENT_URL,
}

if (!env.MONGODB_URL) {
  throw new Error('❌ MONGO_URI missing in .env');
}

export default env