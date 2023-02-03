//Phase 1
//stock,company,user routes
const express = require('express');
const auth = require('./auth/auth.controller');
const passport = require('passport');
const router = express.Router();
const userRouter = require('./user/user.controller');
const companiesRouter = require('./companies/companies.controller');
const stocksRouter = require('./stocks/stocks.controller');
const newsRouter = require('./news/news.controller')
const transactionsROuter = require('./transactions/transactions.controller')

router.use('/user', userRouter);
router.use('/companies', companiesRouter);
router.use('/stocks', stocksRouter);
router.use('/news', newsRouter);
router.use('/transactions', transactionsROuter);

module.exports = router;


//Phase 2
//schemes

