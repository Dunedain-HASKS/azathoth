// /stocks - GET
// /schems/:id - GET
// /schems/:id - SET
// /schems/:id - PUT
// /schems/:id - DELETE

const router = require('express').Router()
const Schemes = require('./schemes.schema')
const User = require('../user/user.schema')
const Transaction = require('../transactions/transactions.schema');

router.get("/", async (req, res) => {
    try {
        const schemes = await Schemes.find({})
        if (schemes) {
            res.json({
                status: 200,
                message: 'Schemes found',
                data: schemes
            })
        } else {
            res.json({
                status: 401,
                message: 'Schemes not found',
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

router.get("/:id", async (req, res) => {
    try {
        const scheme = await Schemes.findById(req.params.id)
        if (scheme) {
            res.json({
                status: 200,
                message: 'Scheme found',
                data: scheme
            })
        } else {
            res.json({
                status: 401,
                message: 'Company not found',
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

router.post("/:id/buy", async (req, res) => {
    const { id } = req.params;
    const scheme = await Schemes.findById(id).exec();
    const user = await User.findById(req.body.id).exec();
    const portfolio = user.portfolio;
    scheme.stocks.map( async (stock) => {
        portfolio.push(stock)
        const document = new Transaction({
            stock: stock.id,
            amount: stock.amount,
            date: new Date(),
        });
        const transaction = await document.save();
        user.transactions.push(transaction._id);
    })

    const newuser = await User.updateOne({ _id: req.body.id }, { portfolio: portfolio, transactions: user.transactions , active_schemes: { $push: { scheme } } }, { new: true }).exec();
    res.json({
        status: 200,
        message: 'Scheme bought successfully',
        data: {
            user: newuser
        }
    });
});

router.post("/:id/sell", async (req, res) => {
    const { id } = req.params;
    const scheme = await Schemes.findById(id).exec();

    scheme.stocks.map((stock) => {
        User.findByIdAndUpdate(req.body.id, {})
    })

    const schemeId = scheme.stocks._id;
    const amount = req.body.amount;
    const portfolio = user.portfolio;

    const stockIndex = portfolio.findIndex((pair) => {
        console.log(pair.get('stock'), schemeId);
        return String(pair.get('stock')) == String(schemeId);
    });

    portfolio[stockIndex].set('amount', portfolio[stockIndex].get('amount') - amount);

    const document = new Transaction({
        stock: schemeId,
        amount: -amount,
        date: new Date(),
    });

    const transaction = await document.save();
    user.transactions.push(transaction._id);
    const newuser = await User.updateOne({ _id: req.body.id }, { portfolio: portfolio, transactions: user.transactions }, { new: true }).exec();
    res.json({
        status: 200,
        message: 'Stock sold successfully',
        data: {
            transaction,
            user: newuser
        }
    });
});

module.exports = router