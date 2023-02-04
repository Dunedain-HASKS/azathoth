//Phase 1
//stock,company,user routes
const express = require('express');
const router = express.Router();
const userRouter = require('./user/user.controller');
const companiesRouter = require('./companies/companies.controller');
const stocksRouter = require('./stocks/stocks.controller');
const newsRouter = require('./news/news.controller')
const transactionsRouter = require('./transactions/transactions.controller')

const bcrypt = require('bcrypt');
const User = require('./user/user.schema');
router.use('/user', userRouter);
router.use('/companies', companiesRouter);
router.use('/stocks', stocksRouter);
router.use('/news', newsRouter);
router.use('/transactions', transactionsRouter);

module.exports = router;

router.post('/auth', async (req, res) => {
     const { email, password } = req.body;
     const user = await User.findOne({ email: email }).exec();
     if (user) {
          const auth = await bcrypt.compare(password, user.password);
          if (auth) {
               res.json({
                    status: 200,
                    message: '',
                    data: user
               })
          } else {
               res.json({
                    status: 401,
                    message: 'Invalid Password',
                    data: {}
               })
          }
     } else {
          res.json({
               status: 404,
               message: 'User dont exists',
               data: {}
          })
     }
});

