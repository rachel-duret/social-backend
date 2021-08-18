const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')
const bodyParser = require('body-parser');
const cors = require ('cors');

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
app.use(cors());

app.use('/api/users',userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute);

app.listen(process.env.PORT, ()=>{
    console.log('Server is running! ')
})