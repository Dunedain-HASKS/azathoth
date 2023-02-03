//Phase 1
//stock,company,user routes
const express = require('express');
const router = express.Router();
const userRouter = require('./user/user.controller');
const companiesRouter = require('./companies/companies.controller');
    
router.use('/user',userRouter);
router.use('/companies', companiesRouter);



module.exports = router;
//Phase 2
//schemes

