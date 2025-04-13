const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/personDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Error:', err));

// Schema and Model
const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    mobile: String
});
const Person = mongoose.model('Person', personSchema);

// Routes

// GET /person
app.get('/person', async (req, res) => {
    try {
        const people = await Person.find();
        res.render('index', { people });
    } catch (err) {
        console.error(err);
        res.send('Error retrieving people');
    }
});

// GET form to create person
app.get('/person/new', (req, res) => {
    res.render('new');
});

// POST new person
app.post('/person', async (req, res) => {
    try {
        const newPerson = new Person(req.body);
        await newPerson.save();
        res.redirect('/person');
    } catch (err) {
        console.error(err);
        res.send('Error creating person');
    }
});

// GET edit form
app.get('/person/edit/:id', async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        res.render('edit', { person });
    } catch (err) {
        console.error(err);
        res.send('Error retrieving person for editing');
    }
});

// POST update person
app.post('/person/edit/:id', async (req, res) => {
    try {
        await Person.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/person');
    } catch (err) {
        console.error(err);
        res.send('Error updating person');
    }
});

// GET delete person
app.get('/person/delete/:id', async (req, res) => {
    try {
        await Person.findByIdAndDelete(req.params.id);
        res.redirect('/person');
    } catch (err) {
        console.error(err);
        res.send('Error deleting person');
    }
});

// Default route
app.get('/', (req, res) => {
    res.redirect('/person');
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server running: http://localhost:${port}`);
});
