const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const path = require('path');
const { findById } = require('./models/campground');
const Campground = require('./models/campground')

mongoose.connect('mongodb://localhost:27017/yelpCamp');
app.use(express.urlencoded({ extended: true }));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/campgrounds', async(req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
})

app.get('/campgrounds/:id', async(req, res) => {
    let id = req.params.id;
    // id = id.replace(/\s/g, '');
    // id = id.trim();
    // console.log(id);
    const campground = await Campground.findById(id);
    // console.log(campground);
    res.render('campgrounds/show', { campground });
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})