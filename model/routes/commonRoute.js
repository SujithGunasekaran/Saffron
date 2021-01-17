const router = require('express').Router();
let bcrypt = require('bcrypt');
let axios = require('axios');
let saffronUserInfo = require('../userModel');

/* Signup API */

router.route('/common/signup').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password)
    const newUserInfo = new saffronUserInfo({ username, password });
    saffronUserInfo.findOne({ username: username })
        .then(async (user) => {
            if (user) {
                res.status(300).send('Username Exist')
            }
            else {
                let salt = await bcrypt.genSalt(10);
                newUserInfo.password = await bcrypt.hash(newUserInfo.password, salt)
                await newUserInfo.save()
                    .then(() => {
                        res.status(200).send('Success')
                    })
                    .catch((err) => {
                        res.status(404).send('Error')
                    })
            }
        })
        .catch(err => {
            res.status(404).send(err)
        })
})

/* login */

router.route('/common/login').post((req, res) => {
    saffronUserInfo.findOne({ username: req.body.username })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (result === true) {
                        res.status(200).json(user.username).send()
                    }
                    else {
                        res.status(404).send('Invalid Password')
                    }
                })
            }
            else {
                res.status(404).send('Invalid Username')
            }
        })
        .catch((err) => {
            res.status(404).send(err)
        })
})

module.exports = router;