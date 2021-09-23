const express = require('express');
const router = express.Router();

const Owner = require('../models/owners')

// show owners route
router.get('/:id', async (req, res) => {
    try {
        const owner = await Owner.findById(parseInt(req.params.id));
        res.json(owner);
    } catch (err) {
        res.status(404).send({err})   
    }
})

// owners catto route
router.get('/:id', async (req, res) => {
    try {
        const owner = await Owner.findById(parseInt(req.params.id));
        const cats = await owner.cats;
        res.json(cats);
    } catch (err) {
        res.status(404).send({err})
    }
})

module.exports = router;