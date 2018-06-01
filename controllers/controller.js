const waterfall = require('async-waterfall');
const crypto = require('crypto');
const bCrypt = require('bcrypt-nodejs');
const nodemailer = require('nodemailer');

// Routes

module.exports = function(app, passport, db){

    const Users = db.users;
    const Statistics = db.statistics;
    const Resources = db.resources;
    const Config = db.config;

    app.get('/', function(req, res){
        res.render('index');
    });

    app.get('/signin', function(req, res){
        res.render('signin', {
            signin: true,
            forgot: false,
            reset: false,
            signup: false,
            flashError: req.flash('error'),
            flashInfo: req.flash('info')
        });
    });

    app.get('/forgot', function(req, res){
        res.render('signin', {
            signin: false,
            forgot: true,
            reset: false,
            signup: false,
            flashError: req.flash('error'),
            flashInfo: req.flash('info')
        });
    });

    app.get('/reset/:token', function(req, res){
        Users.findOne({
            where: { 
                resetPasswordToken: req.params.token, 
                resetPasswordExpires: { $gt: Date.now() } 
            }
        }).then(function(user){
            if (!user) {
                req.flash('error', 'Password reset token is invalid or has expired.');
            }
            res.render('signin', {
                signin: false,
                forgot: false,
                reset: true,
                signup: false,
                flashError: req.flash('error'),
                token: req.params.token
            });
        }).catch(function(){
            req.flash('error', 'Something went wrong accessing the database.');
        });
    });

    app.get('/signup', function(req, res){
        res.render('signin', {
            signin: false,
            forgot: false,
            reset: false,
            signup: true, 
            flashError: req.flash('error')
        });
    });

    app.get('/game', function isLoggedIn(req, res, next){
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/signin');
    }, function(req, res){
        res.render('game');
    });

    app.get('/game/config', function isLoggedIn(req, res, next){
        if (req.isAuthenticated()) {
            return next();
        }
        res.status(401).end();
    }, function(req, res){
        const config = {};
        Config.findOne({
            where: {
                id: 1
            }
        }).then(function(results){
            config.gameConfig = results.dataValues;
            Resources.findOne({
                where: {
                    id: req.user.id
                }
            }).then(function(results){
                config.resourcesConfig = results.dataValues;
                Statistics.findOne({
                    where: {
                        id: req.user.id
                    }
                }).then(function(results){
                    config.statisticsConfig = results.dataValues;
                    res.json(config);
                }).catch(function(err){
                    console.log(`Oh boy, it broke: ${err}`);
                });
            }).catch(function(err){
                console.log(`Oh boy, it broke: ${err}`);
            });
        }).catch(function(err){
            console.log(`Oh boy, it broke: ${err}`);
        });
    });

    app.get('/logout', function(req, res){
        req.session.destroy(function(err){
            res.redirect('/');
        });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/game',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.post('/forgot', function(req, res, next){
        waterfall([
            function(done){
                crypto.randomBytes(20, function(err, buf){
                    const token = buf.toString('hex');
                    done(err, token);
                });
            },
            function(token, done){
                Users.findOne({ 
                    where: {
                        email: req.body.email
                    } 
                }).then(function(user){
                    if (!user) {
                        req.flash('error', 'No account with that email address exists.');
                        return res.redirect('/forgot');
                    }
                    Users.update({
                        resetPasswordToken: token,
                        resetPasswordExpires: Date.now() + 3600000
                    }, {
                        where: {
                            email: req.body.email
                        }
                    }).then(function(){
                        done(null, token, user);
                    }).catch(function(){
                        req.flash('error', 'Something went wrong accessing the database.');
                        res.redirect('/forgot');
                    });
                });
            },
            function(token, user, done){
                const mailer = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'octopiedhelp@gmail.com',
                        pass: 'Octopied35'
                    }
                });
                const mailOptions = {
                    to: user.dataValues.email,
                    from: 'passwordreset@octopied.com',
                    subject: 'Octopied Password Reset',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your Octopied account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };
                mailer.sendMail(mailOptions, function(err, res){
                    if (!err) {
                        req.flash('info', 'An e-mail has been sent to ' + user.dataValues.email + ' with further instructions.');
                    }
                    done(err, 'done');
                });
            }
        ], function(err){
            if (err) {
                req.flash('error', 'Sorry, something went wrong.');
                res.redirect('/forgot');
            } else {
                res.redirect('/forgot');
            }
        });
    });

    app.post('/reset/:token', function(req, res){
        const generateHash = function(password){
            return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };
        waterfall([
            function(done) {
                Users.findOne({
                    where: { 
                        resetPasswordToken: req.params.token, 
                        resetPasswordExpires: { $gt: Date.now() } 
                    }
                }).then(function(user){
                    if (!user) {
                        req.flash('error', 'Password reset token is invalid or has expired.');
                        res.render('signin', {
                            signin: false,
                            forgot: false,
                            reset: true,
                            signup: false,
                            flashError: req.flash('error')
                        });
                    } else {
                        Users.update({
                            password: generateHash(req.body.password)
                        }, {
                            where: {
                                resetPasswordToken: req.params.token
                            }
                        }).then(function(){
                            done(null, user)
                        }).catch(function(){
                            req.flash('error', 'Something went wrong accessing the database.');
                            res.render('signin', {
                                signin: false,
                                forgot: false,
                                reset: true,
                                signup: false,
                                flashError: req.flash('error')
                            });
                        });
                    }
                }).catch(function(){
                    req.flash('error', 'Something went wrong accessing the database.');
                    res.render('signin', {
                        signin: false,
                        forgot: false,
                        reset: true,
                        signup: false,
                        flashError: req.flash('error')
                    });
                });
            },
            function(user, done) {
                const mailer = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'octopiedhelp@gmail.com',
                        pass: 'Octopied35'
                    }
                });
                const mailOptions = {
                    to: user.dataValues.email,
                    from: 'passwordreset@octopied.com',
                    subject: 'Your password has been changed',
                    text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your Octopied account has just been changed.\n'
                };
                mailer.sendMail(mailOptions, function(err, res) {
                    if (!err) {
                        req.flash('info', 'Success! Your password has been changed.');
                    }
                    done(err, 'done');
                });
            }
        ], function(err) {
            if (err) {
                req.flash('error', 'Something went wrong with sending a confirmation email.');
            }
            res.redirect('/signin');
        });
    });

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/game',
        failureRedirect: '/signin',
        failureFlash: true 
    }));

    app.put('/game', function(req, res){
        console.log(req.user.id);
        const userID = req.user.id;
        const statistics = req.body.statistics;
        const resources = req.body.resources;
        Resources.update(resources,
        {
            where: {
                user_id: userID
            }
        }).then(function(result){
            if (result === 0) {
                return res.status(404).end();
            }
            Statistics.update(statistics, 
            { 
                where: {
                    id: id
                }
            }).then(function(result){
                if (result === 0) {
                    return res.status(404).end();
                }
                res.status(200).end();        
            }).catch(function(err){
                console.log(`Oh boy, it broke: ${err}`);
            });
        }).catch(function(err){
            console.log(`Oh boy, it broke: ${err}`);
        });
    });
    
};