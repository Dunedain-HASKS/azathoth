//get user using auth_token i.e. req.body (will be done by passport middleware)
// /create
// /update
// /delete
// /schemes
// /transactions
// 
const Stock = require('../stocks/stocks.schema');
const router = require('express').Router();
const User = require('./user.schema')
const bcrypt = require('bcrypt')
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).exec();
        const portfolio = user.portfolio;
        const holdings = portfolio.reduce((acc, stock) => {
            return acc + stock.get('amount');
        }, 0);
        if (user) {
            const currentNetWorth = user.net_worth[user.net_worth.length - 1].get('value');
            const funds = currentNetWorth - holdings;
            res.json({
                status: 200,
                message: '',
                data: { ...(user._doc), holdings, funds }
            })
        } else {
            res.json({
                status: 401,
                message: 'User dont exists',
                data: {}
            })
        }
    } catch (err) {
        res.json({
            status: 401,
            message: err,
            data: {}
        })
    }
})

router.post("/", async (req, res) => {

    try {
        const newuser = req.body;
        newuser.portfolio = []
        newuser.net_worth = [{
            date: new Date(),
            value: 100000
        }];
        newuser.active_schemes = []
        newuser.transactions = []
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.json({
                status: 401,
                message: 'User already exists!',
                data: {}
            })
        }

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const data = { ...req.body, password: hashedPassword };

        const userSave = new User(data);
        await userSave.save();

        res.json({
            status: 200,
            message: '',
            data: userSave
        })
    } catch (err) {
        res.json({
            status: 401,
            message: err,
            data: {}
        })
    }
})

router.delete("/", (req, res) => {
    try {
        User.deleteOne({ _id: req.body.id }, (err) => {
            if (err) {
                res.json({
                    status: 401,
                    message: err,
                    data: {}
                })
            } else {
                res.json({
                    status: 200,
                    message: 'Deleted successfully',
                    data: {}
                })
            }
        })
    } catch (err) {
        res.json({
            status: 401,
            message: err,
            data: {}
        })
    }
})

router.put("/", (req, res) => {
    try {
        User.findByIdAndUpdate(req.body.id, req.body, (err) => {
            if (err) {
                res.json({
                    status: 401,
                    message: err,
                    data: {}
                })
            } else {
                res.json({
                    status: 200,
                    message: 'Updated successfully',
                    data: {}
                })
            }
        })
    } catch (err) {
        res.json({
            status: 401,
            message: err,
            data: {}
        })
    }
});

router.get("/:id/transactions", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('transactions').exec();
        if (user) {
            const transactions = await Promise.all(user.transactions.map(async (transaction) => (
                {
                    "_id": transaction._id,
                    "stock": await Stock.findById(transaction.stock),
                    "amount": transaction.amount,
                }
            )));
            console.log(transactions)
            res.json({
                status: 200,
                message: 'Transactions fetched successfully',
                data: transactions
            })
        } else {
            res.json({
                status: 401,
                message: 'User dont exists',
                data: {}
            })
        }
    } catch (err) {
        console.log(err);
        res.json({
            status: 401,
            message: err,
            data: {}
        })
    }
});

router.get("/:id/portfolio", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('portfolio').exec();
        if (user) {
            const portfolio = await Promise.all(user.portfolio.map(async (batch) => (
                {
                    "stock": await Stock.findById(batch.get('stock')),
                    "amount": batch.get('amount'),
                }
            )));
            res.json({
                status: 200,
                message: '',
                data: portfolio
            })
        } else {
            res.json({
                status: 401,
                message: 'User dont exists',
                data: {}
            })
        }
    } catch (err) {
        res.json({
            status: 401,
            message: err,
            data: {}
        })
    }
});


module.exports = router;