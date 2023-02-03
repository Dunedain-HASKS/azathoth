// /stocks - GET
// /stocks/:id - GET

const router = require('express').Router()
const News = require('./news.schema')

router.get('/', async (req, res) => {
    try {
        const news = await News.find({})
        if (news) {
            res.json({
                status: 200,
                message: 'News found',
                data: news
            })
        } else {
            res.json({
                status: 401,
                message: 'News not found',
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

module.exports = router