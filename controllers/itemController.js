const Item = require('../models/itemModel');

const renderIndex = async (req, res) => {
    try {
        const items = await Item.find();
        res.render('index', { items });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

module.exports = { renderIndex }