//Phase 1
//stock,company,user routes
const express = require('express');
const auth = require('./auth/auth.controller');
const passport = require('passport');
const router = express.Router();
const userRouter = require('./user/user.controller');
const companiesRouter = require('./companies/companies.controller');
    
router.use('/user',userRouter);
router.use('/companies', companiesRouter);


const stock = require('./stocks/stocks.controller');

router.use('/stock', stock);

module.exports = router;
     


//Phase 2
//schemes

