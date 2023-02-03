// /companies
// /companies/:id
const router = require('express').Router()
const Company = require('./companies.schema')

router.get("/", async (req, res) => {
    try {
        const companies = await Company.find({})
        if (companies) {
            res.json({
                status: 200,
                message: 'Companies found',
                data: companies
            })
        } else {
            res.json({
                status: 401,
                message: 'Companies not found',
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
    console.log(req.params.id)
    try {
        const company = await Company.findById(req.params.id)
        if (company) {
            res.json({
                status: 200,
                message: 'Company found',
                data: company
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

router.get("/:id/news", async (req, res) => {
    try {
        res.send('hello')
    } catch (err) {
        res.json({
            status: 401,
            message: err,
            data: {}
        })
    }
})

module.exports = router