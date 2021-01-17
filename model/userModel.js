const mongoose = require('mongoose');

let userInfoSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})

const userInfo = mongoose.model('SaffronUserInfo', userInfoSchema);
module.exports = userInfo;