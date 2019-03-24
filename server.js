const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const DB = require('./config/keys').MONGO_URI;
const PORT = process.env.PORT || 5000;
//Profiles Users and Posts for user profile viewing, user authentication and user comments/posts
const user = require('./routes/api/user');
const profile = require('./routes/api/profile');
const post = require('./routes/api/post');

//Middleware Setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Route Setup
app.use('/api/post', post);
app.use('/api/profile', profile);
app.use('/api/user', user);

//Mongoose Setup
mongoose.promise = global.promise;
mongoose.connect(DB, { useNewUrlParser: true })
.then(() => console.log('connected to MongoDB'))
.catch(err => console.log(err))

//Basic Route Setup
app.get('/', (req, ress) => res.send('Hello World'));

app.listen(PORT, () => console.log(`Listening at ${PORT}`));
