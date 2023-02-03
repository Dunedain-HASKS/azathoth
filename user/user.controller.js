//get user using auth_token i.e. req.user (will be done by passport middleware)
// /create
// /update
// /delete
// /schemes
// /transactions
// 
import User from './user.schema'
const router = require('express').Router()


router.get("/user", async (req, res) => {
    try {
        const user = await User.findById(req.user)
        if (user) {
            res.json({
                status: 200,
                message: '',
                data: user
            })
        } else {
            res.json({
                status: 401,
                message: 'User dont exists',
                data: {}
            })
        }
    } catch(err) {
        res.json({
            status: 401,
            message: err,
            data: {}
        })
    }
})

router.post("/user", async (req, res) => {
    try {
        const user = await User.findById(req.user)
        if (user) {
            return res.json({
                status: 401,
                message: 'User already exists!',
                data: {}
            })
        }

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.user.password, salt);
        const data = { ...req.user, password: hashedPassword };

        User.save(data, (err, collection) => {
            if (err) {
                throw err;
            }
        });
        res.json({
            status: 200,
            message: '',
            data: data
        })
    } catch(err) {
        res.json({
            status: 401,
            message: err,
            data: {}
        })
    }
})

module.exports = router
