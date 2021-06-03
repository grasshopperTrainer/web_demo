const Joi = require('joi');
const express = require('express');
const router = express.Router();

// genre functions
const genres = [
    {name: 'horror'},
    {name: 'comedy'},
    {name: 'remence'},
    {name: 'sf'},
    {name: 'fantasy'},
    {name: 'drama'},
    {name: 'mystery'},
    {name: 'action'},
    {name: 'thriller'}
]

function isValidGenre(content) {
    // check if given genre follows schema
    const schema = Joi.object({
        name: Joi.string()
        .alphanum()
        .min(2)
        .required()
    });
    
    return schema.validate(content);
}

// get all known genres
router.get('/', (req, res) => {
    res.render('index', {title: 'My Express App', message:'genres'});
});

// post new genre
router.post('/', (req, res) => {
    // check good request
    const {error} = isValidGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    // check if named exists
    const genre = genres.find(c => req.body.name === c.name);
    if (genre) return res.status(409).send('Given genre already exists.')
    
    // push if new genre
    const newGenre = {name: req.body.name};
    genres.push(newGenre);
    res.status(201).send(newGenre);
});

// delete genre
router.delete('/:name', (req, res) => {
    // check if requested exist
    const genre = genres.find(c => c.name === req.params.name);
    if (!genre) return res.status(404).send("Given genre doesn't exist.")
    
    // remove if present
    genres.splice(genres.indexOf(genre), 1);
    res.status(200).send(genres);
});

module.exports = router;