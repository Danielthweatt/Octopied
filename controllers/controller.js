const express = require("express");
const db = require("../models");

// Router Setup
const router = express.Router();

// Router
router.get('/', function(req, res){
    res.render('signin');
});

router.get('/signin', function(req, res){
    res.render('signin');
});

router.get('/signup', function(req, res){
    res.render('signup');
});

router.get('/game', function(req, res){
    res.render('index');
});

// Export
module.exports = router;