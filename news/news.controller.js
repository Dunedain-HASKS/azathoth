// /stocks - GET
// /stocks/:id - GET

const router = require('express').Router()
const News = require('./news.schema')
const data = []

router.get('/', async (req, res) => {
    try {
        const news = await News.find({}).exec();
        const randNews = []
        for (let i = 0; i < 100; i++) {
            randNews.push(news[Math.floor(Math.random()*5049 + 1)])
        }
        if (randNews.length) {
            res.json({
                status: 200,
                message: 'News found',
                data: randNews
            })
        } else {
            res.json({
                status: 404,
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