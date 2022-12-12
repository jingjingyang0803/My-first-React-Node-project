const express = require('express');
const bodyParser = require('body-parser');

const emojis = require('./emojis');
const tasks = require('./tasks');
const tasklist=require('./tasklist');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use(bodyParser.json());
router.use('/emojis', emojis);
router.use('/tasks', tasks);
router.use('/task/list', tasklist);


//MongoDB connection
const mongoose = require('mongoose');
const mongoURL = "mongodb+srv://mongoviope:0803@cluster0.xgafe.mongodb.net/todolistdb?retryWrites=true&w=majority";
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


module.exports = router;
