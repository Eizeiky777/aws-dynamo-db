const express = require('express');
const { createMovie } = require('../controllers/create-movie');

const router = express.Router();

router.post('/', createMovie);

module.exports = router;
