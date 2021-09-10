const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
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
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });
app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(process.env.PORT, ()=>{
    console.log('Server is running! ')
})