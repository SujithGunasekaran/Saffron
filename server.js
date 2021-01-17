let mongoose = require('mongoose');
let express = require('express');
let dotEnv = require('dotenv');
let cors = require('cors');

let app = express();
dotEnv.config();

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})

app.use(express.json());
app.use(cors());

let mongoURI = process.env.mongodbURI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

mongoose.connection.once('open', () => {
    console.log("mongoDB Connected successfully")
})

let newSaffronUserInfo = require('./model/routes/userRoute');
let commonRouterData = require('./model/routes/commonRoute');

app.use('/commonRoute', commonRouterData);
app.use('/userData', newSaffronUserInfo);


