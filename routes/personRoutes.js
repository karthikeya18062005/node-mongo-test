const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// GET /person - Get all people
router.get('/', async (req, res) => {
    try {
        const people = await Person.find();
        res.status(200).json(people);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch people', details: err });
    }
});

// POST /person - Create a new person
router.post('/', async (req, res) => {
    try {
        const person = new Person(req.body);
        await person.save();
        res.status(201).json({ message: 'Person created successfully', person });
    } catch (err) {
        res.status(400).json({ error: 'Failed to create person', details: err });
    }
});

// PUT /person/:id - Update an existing person
router.put('/:id', async (req, res) => {
    try {
        const person = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!person) return res.status(404).json({ error: 'Person not found' });
        res.status(200).json({ message: 'Person updated successfully', person });
    } catch (err) {
        res.status(400).json({ error: 'Failed to update person', details: err });
    }
});

// DELETE /person/:id - Delete a person
router.delete('/:id', async (req, res) => {
    try {
        const person = await Person.findByIdAndDelete(req.params.id);
        if (!person) return res.status(404).json({ error: 'Person not found' });
        res.status(200).json({ message: 'Person deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete person', details: err });
    }
});

module.exports = router;
