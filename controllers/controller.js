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

    app.get('/game', function isLoggedIn(req, res, next){
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/signin');
    }, function(req, res){
        res.render('index');
    });

    app.get('/logout', function(req, res){
        req.session.destroy(function(err){
            res.redirect('/');
        });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/game',
        failureRedirect: '/signup'
    }));

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/game',
        failureRedirect: '/signin'
    }));

};