//Phase 1
//stock,company,user routes
const express = require('express');
const router = express.Router();
const userRouter = require('./user/user.controller');
const companiesRouter = require('./companies/companies.controller');
const stocksRouter = require('./stocks/stocks.controller');
const newsRouter = require('./news/news.controller')
const transactionsRouter = require('./transactions/transactions.controller')

router.use('/user', userRouter);
router.use('/companies', companiesRouter);
router.use('/stocks', stocksRouter);
router.use('/news', newsRouter);
router.use('/transactions', transactionsRouter);

module.exports = router;

//Phase 2
//schemes

