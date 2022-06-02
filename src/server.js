const express = require('express');
const bodyParser = require('body-parser');
const useragent = require('express-useragent')
const app = express();
const cors = require('cors');
const config = require('./config');

// mqtt config
// global.mqtt = require('./mqtt.js');
// mqtt.configure(config);
// mqtt.start();


// const aedes = require('aedes')()
// const server = require('net').createServer(aedes.handle)
// const port = 1884
// parse application/x-www-form-urlencoded
const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(useragent.express());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: true }));
// parse application/json
app.use(bodyParser.json());
app.use(express.static('uploads'))
app.get('/', (req, res) => {
    // res.json({status: true});
    res.status(200).send('money4u.')
});
const { verify } = require('./utils/helper/jwt_service');
app.use(verify)
const Customer_routes = require('./routes/customer.route')
app.use('/', Customer_routes);
const Login_routes = require('./routes/login.route')
app.use('/', Login_routes)
const Document_routes = require('./routes/document.route')
app.use('/', Document_routes)
const Relative_relation = require('./routes/relative_relation.route')
app.use('/', Relative_relation)
const Relationship = require('./routes/relationship.route')
app.use('/', Relationship)
const Relative_cutomer = require('./routes/relative_customer.route')
app.use('/', Relative_cutomer)
const loan_contract = require('./routes/loan_contract.route')
app.use('/', loan_contract);
const main_loan_contract = require('./routes/main_loan_contract.route')
app.use('/', main_loan_contract);
const account = require('./routes/account.route')
app.use('/', account);
const method_payment = require('./routes/method_payment.route')
app.use('/', method_payment)
const loan_term = require('./routes/loan_term.route')
app.use('/', loan_term)
const loan_objective = require('./routes/loan_objective.route')
app.use('/', loan_objective)
const loan_limit = require('./routes/accout_loan_limitation.route')
app.use('/', loan_limit)
const bank = require('./routes/bank.route')
app.use('/', bank)
const loan_rate = require('./routes/loan_rate.route')
app.use('/', loan_rate)
const reqInvloan_rateestment = require('./routes/request_investment.route')
app.use('/', reqInvloan_rateestment);
const loan_term_method_payment = require('./routes/loanterm_methodpayment.route')
app.use('/', loan_term_method_payment);
const account_block = require('./routes/account_block.route')
app.use('/', account_block);
const loan_profile = require('./routes/loan_profile.route')
app.use('/', loan_profile);
const payment_schedule = require('./routes/payment_schedule.route')
app.use('/', payment_schedule);
const acc_bank_trans = require('./routes/account_bank_transaction.route')
app.use('/', acc_bank_trans);
const acc_block_trans = require('./routes/account_block_transaction.route')
app.use('/', acc_block_trans);

const notification = require('./routes/notifications.route')
app.use('/',notification)


// var https = require('https');
// var fs = require('fs');
// var https_options = {
//   key: fs.readFileSync("./api_ssl/api_money4u_vn.key"),
//   cert: fs.readFileSync("./api_ssl/api.money4u.vn-ca.crt"),
//   ca: [
//           fs.readFileSync('./api_ssl/RootCA.crt'),
//           fs.readFileSync('./api_ssl/Chain_RootCA_Bundle.crt')
//        ]
// };

//không dùng ssl
app.listen(3001, () => console.log(`server p2p running on port ${3000}`));// mo cong
// dùng ssl
// https.createServer(https_options, app).listen(3000, () => console.log(`server p2p running on port ${3000}`));// mo cong
