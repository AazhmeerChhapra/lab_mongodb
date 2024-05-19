const express = require('express');
const router = express.Router();
const Item = require('../models/itemModel');  // Update this line

// Create
router.post('/items', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Read
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.render('index', { items: items });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update
router.post('/items/update/:id', async (req, res) => {
    try {
        await Item.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Delete
router.get('/items/delete/:id', async (req, res) => {
    try {
        await Item.findOneAndDelete({ _id: req.params.id });
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Form route
router.get('/form', (req, res) => {
    res.render('form');
});

module.exports = router;
