const { connect, mongoose } = require('./db');
let app = require('./index');
const { CreateSubscriptionPlans } = require('./services/createSubscriptionPlans/createSubscriptionPlans');

require('dotenv').config();
const port = process.env.PORT || 8000;

connect();

// Create the subscription plans when the server starts
const createSubscriptionPlansService = new CreateSubscriptionPlans();
createSubscriptionPlansService.do();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});