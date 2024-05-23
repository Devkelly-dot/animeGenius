const mongoose = require('mongoose');
const Agenda = require('agenda');
const { ResetAllSubscriptionsRequestsService } = require('../services/resetDailyRequests/resetRequestsService');
require('dotenv').config()
const db_uri = process.env.DB_URI;

const resetDailyLimitAgenda = new Agenda({db: {address: db_uri}, defaultConcurrency: 1});

resetDailyLimitAgenda.define('resetDailyLimit', async job => {
    try { 
        console.log('Starting reset daily limit at', new Date());
        const resetService = new ResetAllSubscriptionsRequestsService();
        await resetService.do();
        console.log('Finished reset daily limit at', new Date());
    } catch (error) {
        console.log("RESET DAILY LIMIT FAILED: ", error);
    }
});

mongoose.connect(db_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Scheduler Connected to DB');
        // Start Agendas and schedule the jobs
        await resetDailyLimitAgenda.start();
        await resetDailyLimitAgenda.every('0 0 * * *', 'resetDailyLimit');
    }).catch((err) => {
        console.error(err);
    });