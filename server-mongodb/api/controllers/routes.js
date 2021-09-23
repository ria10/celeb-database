const express = require('express');
const router = express.Router();
const { init } = require('../dbConfig');

const Celeb = require('../models/celeb');

// index route <-- works

router.get('/', async function (req, res) {
    try {
        const celebs = await Celeb.all;
        res.json({celebs});
    } catch (err) {
        res.status(500).json({err});
    }
});

// show route <-- works

router.get('/:id', async function(req, res) {
    try {
        const celeb = await Celeb.findById(req.params.id);
        res.json(celeb) 
    } catch (err) {
        res.status(404).json({err});
    }
});

// create route <-- works

router.post('/', async function (req, res) {
    try {
        const celeb = await Celeb.create(req.body.name, req.body.age, req.body.birthplace, req.body.awards);
        res.json(celeb);
    } catch (err) {
        res.status(404).json({err});
    }
})

// update age route <-- works

router.patch('/:id/age', async function (req, res) {
    try {
        const celeb = await Celeb.findById(req.params.id);
        const updatedCeleb = await celeb.updateAge(req.body.age);
        res.json(updatedCeleb);
    } catch (err) {
        res.status(500).json({err})
    }
})

// update awards route <-- works

router.patch('/:id/awards', async function (req, res) {
    try {
        const celeb = await Celeb.findById(req.params.id);
        const updatedCeleb = await celeb.updateAwards(req.body.awards);
        res.json(updatedCeleb);
    } catch (err) {
        res.status(500).json({err})
    }
})

// delete celeb route <-- works

router.delete('/:id', async function (req, res) {
    try {
        const celeb = await Celeb.findById(req.params.id);
        await celeb.destroy();
        res.status(204).json('celeb deleted')
    } catch (err) {
        res.status(500).json({err});
    }
});

module.exports = router;