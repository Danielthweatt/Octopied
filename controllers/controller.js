// Modules
const express = require("express");
const db = require("../models");

// Router Setup
const router = express.Router();

// Router
router.get('/', function (req, res) {
    res.render('home');
});

router.get('/game', function (req, res) {
    res.render('index');
});

// Export
module.exports = router;