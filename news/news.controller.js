// /stocks - GET
// /stocks/:id - GET

const router = require('express').Router()
const News = require('./news.schema')
const data = []

// async function getData() {
//     const url = 'https://finnhub.io/api/v1/company-news?symbol=AAPL&from=2013-09-01&to=2023-09-09&token=cfenj61r01qoicaf7a0gcfenj61r01qoicaf7a10';
//     const response = await fetch(url);
//     const jsonResponse = await response.json();
//     News.create(jsonResponse)
//   } 
  
//   getData();

router.get('/', async (req, res) => {
    try {
        const news = await News.find({})
        if (news) {
            res.json({
                status: 200,
                message: 'News found',
                data: companies
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