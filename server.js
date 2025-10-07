require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');

const app = express();
mongoose.connect(process.env.MONGO_URI);

app.set('view engine', 'ejs');
app.use(expressLayouts); 
app.set('layout', 'layout');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

const authRoutes = require('./routes/auth');
const vaultRoutes = require('./routes/vault');
const indexRoutes=require('./routes/index');

app.use('/', indexRoutes); 
app.use('/', authRoutes);
app.use('/vault', vaultRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
