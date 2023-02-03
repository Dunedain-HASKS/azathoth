const router = require('express').Router()
const Transaction = require('./transactions.schema')

router.put('/', async (req, res) => {
    try{
        const user  = await Transaction.findById(req.body.user.id)
        const stock = await Transaction.findById(req.body.stock.id)
        // Transaction.findByIdAndUpdate(user._id, {})
    } catch(err) {
        res.json({
            status: 401,
            message: err,
            data: {}
        })
    }
})

module.exports = router