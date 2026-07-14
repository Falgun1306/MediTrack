import app from './app.js'
import connectDB from './config/db.js'
import env from './config/env.js';
import startReminderScheduler from './schedulers/reminder.cron.js';

const startServer = async ()=>{
    await connectDB();

    app.listen(env.PORT, ()=>{
        console.log(`Server is running on PORT:${env.PORT}`);
        
        // startReminderScheduler();

    });
};

startServer();