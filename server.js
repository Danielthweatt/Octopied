const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const routes = require("./controllers/controller.js");
const db = require("./models");
const flash = require('connect-flash');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(session({secret: 'keyboard cat',resave: true, saveUninitialized:true}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport/passport.js')(passport, db.users);
require('./controllers/controller.js')(app, passport, db.users);
 
db.sequelize.sync().then(function(){
    app.listen(PORT, function(){
        console.log("App listening on PORT " + PORT);
    });
});  