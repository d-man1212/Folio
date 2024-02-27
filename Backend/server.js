const express = require('express');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();

const userRoutes = require('./routes/user');
const userregisterRoutes = require('./routes/register');
const addToListRoutes = require('./routes/addtolist');
const createNewListRoutes = require('./routes/createNewList');
const searchbooksRoutes = require('./routes/searchbooks');
const bookByUserQueryRouter = require('./routes/bookbyuserQuery');
const userReviewAnalyseRouter = require('./routes/userReviewAnalyser');
const bookreviewRouter = require('./routes/bookreview');
const findGenereRouter = require('./routes/findGenere');
const islikedByuserRouter = require('./routes/islikedByuser');
const getuserprefrenceRouter = require('./routes/getuserprefrence');


mongoose.connect(process.env.API_KEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
})
.catch((err) => {
  console.error('MongoDB connection error', err);
});




app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

app.use('/user', userRoutes);
app.use('/register', userregisterRoutes);
app.use('/createNewList', createNewListRoutes);
app.use('/addToList', addToListRoutes);
app.use('/search', searchbooksRoutes);

app.use('/bookmyUserQuery', bookByUserQueryRouter);
app.use('/analyseUserReview', userReviewAnalyseRouter);
app.use('/review', bookreviewRouter);
app.use('/findgenre', findGenereRouter);
app.use('/likedbyUser', islikedByuserRouter);
app.use('/getuserpreference', getuserprefrenceRouter);








const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
