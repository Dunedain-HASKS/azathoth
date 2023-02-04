//get user using auth_token i.e. req.body (will be done by passport middleware)
// /create
// /update
// /delete
// /schemes
// /transactions
// 
const router = require('express').Router();
const User = require('./user.schema')
const bcrypt = require('bcrypt')
router.get("/", async (req, res) => {
    try {
        const user = await User.findById(req.body.id).exec();
        const portfolio = user.portfolio;
        var holdings = 0;
        portfolio.forEach((pair) => {
            holdings += pair.get('amount');
        });
        if (user) {
            const funds = user.net_worth[user.net_worth.length - 1].get('value') - holdings;
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
        console.log(err);
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

router.get("/transactions", async (req, res) => {
    try {
        const user = await User.findById(req.body.id).exec().populate('transactions');
        if (user) {
            res.json({
                status: 200,
                message: '',
                data: user.transactions
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

router.get("/portfolio", async (req, res) => {
    try {
        const user = await User.findById(req.body.id).exec().populate('portfolio');
        if (user) {
            res.json({
                status: 200,
                message: '',
                data: user.portfolio
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