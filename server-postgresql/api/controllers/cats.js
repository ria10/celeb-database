const express = require('express');
const router = express.Router();

const Cat = require('../models/cats');

// cat index route

router.get('/', async (req, res) => {
    try {
        const cats = await Cat.all;
        res.json({cats});
    } catch (err) {
        res.status(500).json({err});
    }
})

// show cats route

router.get('/:id', async (req, res) => {
    try {
        const cat = await Cat.findById(parseInt(req.params.id));
        res.json(cat);
    } catch (err) {
        res.status(404).json({err});
    }
})

// create cat route

router.post('/', async (req, res) => {
    try {
        const cat = await Cat.create(req.body.name, req.body.breed);
        res.json(cat);
    } catch (err) {
        res.status(404).json({err});
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const cat = await Cat.findById(parseInt(req.params.id));
        await cat.destroy();
        res.status(204).json('catto deleted');
    } catch(err) {
        res.status(500).json({err});
    }
})

module.exports = router;