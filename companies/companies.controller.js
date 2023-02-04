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
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.json({
            status: 404,
            message: 'Invalid stock id',
            data: {}
        });
    }
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
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.json({
            status: 404,
            message: 'Invalid stock id',
            data: {}
        });
    }
    try {
        const { id } = req.params
        const company = await Company.findById(id)
        if (company) {
            res.json({
                status: 200,
                message: 'Company News found',
                data: company.news
            })
        } else {
            res.json({
                status: 401,
                message: 'Company News not found',
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