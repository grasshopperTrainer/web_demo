const express = require('express');
const genres = require('./genres/genres');
const router = express.Router();
router.use('/api/genres', genres);

router.get('/', (req, res) => {
    res.render('main', {title: 'My Express App', message: 'app for genres'});
});

module.exports = router;