const express = require("express");
const db = require("../models");

// Routes

module.exports = function(app, passport){
    app.get('/', function(req, res){
        res.render('signin');
    });

    app.get('/signin', function(req, res){
        res.render('signin');
    });

    app.get('/signup', function(req, res){
        res.render('signup');
    });

    app.get('/game', function(req, res){
        res.render('index');
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/game',
        failureRedirect: '/signup'
    }));
};