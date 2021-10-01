const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/users')
const postRoute = require('./routes/post')
const commentRoute = require('./routes/comment');
const bodyParser = require('body-parser');
const cors = require ('cors');
const path = require('path')
const multer = require('multer');

dotenv.config();

mongoose.connect(process.env.DBURL, {
  useNewUrlParser: true ,
    useUnifiedTopology:true,
    useCreateIndex:true
})
.then(()=>{
    console.log('Connect to mongoodb!');
})
.catch((err)=>{
    console.log('Connect to mongoodb filed!'+err);
})


app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('common'));
app.use(cors({
  origin:["http://localhost:3000"],
  methods:["GET", "POST", "PUT", "DELETE"],
  /* credentials: true */
}));

app.use('/api/users',userRoute)
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute)

app.listen(process.env.PORT, ()=>{
    console.log('Server is running! ')
})