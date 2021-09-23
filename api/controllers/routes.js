const express = require('express');
const router = express.Router();
const { init } = require('../dbConfig');

const Celeb = require('../models/celeb');

// index route

router.get('/', async function (req, res) {
    try {
        const celebs = await Celeb.all;
        res.json({celebs});
    } catch (err) {
        res.status(500).json({err});
    }
});

// show route 

router.get('/:id', async function(req, res) {
    try {
        const celeb = await Celeb.findById(req.params.id);
        res.json(celeb) 
    } catch (err) {
        res.status(404).json({err});
    }
});

// create route

// router.post('/', async function (req, res) {
//     try {
//         const celeb = await Celeb.create(req.body.name, req.body.age, req.body.birthplace, req.body.awards);
//         console.log(celeb)
//         res.json(celeb);
//     } catch (err) {
//         res.status(404).json({err});
//     }
// })

router.post("/", async (req, res) => {
    try {
        const db = await init();
        let celebs = {name: req.body.name, age: req.body.age, birthplace: req.body.birthplace, awards: req.body.awards}
    }
})

// update age route

router.patch('/:id/age', async function (req, res) {
    try {
        const celeb = await Celeb.findById(req.params.id);
        const updatedCeleb = await celeb.updateAge(req.body.age);
        res.json(updatedCeleb);
    } catch (err) {
        res.status(500).json({err})
    }
})

// update awards route

router.patch('/:id/awards', async function (req, res) {
    try {
        const celeb = await Celeb.findById(req.params.id);
        const updatedCeleb = await celeb.updateAwards(req.body.awards);
        res.json(updatedCeleb);
    } catch (err) {
        res.status(500).json({err})
    }
})

// delete celeb route 

router.delete('/:id', async function (req, res) {
    try {
        const celeb = await Celeb.findById(req.params.id);
        await Celeb.destroy();
        res.status(204).json('celeb deleted')
    } catch (err) {
        res.status(500).json({err});
    }
});

module.exports = router;