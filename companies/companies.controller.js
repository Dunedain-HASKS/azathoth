// /companies
// /companies/:id
const router = require('express').Router()
const Company = require('./companies.schema')
const News = require('../news/news.schema')

const func = () => {
    console.log(News.find({}))
}

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
        const { id } = req.params
        const currentCompany = await Company.findById(id)

        const response = await fetch(`https://finnhub.io/api/v1/company-news?symbol=${currentCompany.ticker}&from=2013-09-01&to=2023-09-09&token=cfenj61r01qoicaf7a0gcfenj61r01qoicaf7a10`)
        Company.findByIdAndUpdate(id, {$push: {news: response.json()}})
        if (company) {
            res.json({
                status: 200,
                message: 'Company found',
                data: company.news
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
});

module.exports = router