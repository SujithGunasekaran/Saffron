const router = require('express').Router();
let axios = require('axios');

/* Signup API */

router.route('/user/signup').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const userInfo = { username: username, password: password };
    axios.post('http://localhost:5000/commonRoute/common/signup', userInfo)
        .then((responseData) => {
            res.status(200).send(responseData.data)
        })
        .catch((err) => {
            res.status(404).send(err);
        })
})

/* Login API */

router.route('/user/login').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const userData = { username: username, password: password };
    axios.post('http://localhost:5000/commonRoute/common/login', userData)
        .then((responseData) => {
            res.status(200).send(responseData.data)
        })
        .catch((err) => {
            res.status(404).send(err)
        })

})

module.exports = router;