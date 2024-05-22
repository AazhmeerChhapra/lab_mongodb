const express = require('express');
const router = express.Router();
const Item = require('../models/itemModel');  // Update this line
const { renderIndex } = require('../controllers/itemController');  // Update this line
const { restrictToLoggedInUsers } = require('../middlewares/auth');

// Create
router.post('/items', restrictToLoggedInUsers, async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Read
router.get('/', renderIndex);

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

router.get('/signup', (req, res) => {
    return res.render("signup");
});
router.get('/login', (req, res) => {
    return res.render("login");
});

module.exports = router;
