const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;
const exphbs  = require('express-handlebars');
const db = require("./models");
require('dotenv').config();
 
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(routes);
 
app.get('/', function (req, res) {
    res.render('home');
});

app.get('/game', function (req, res) {
    res.render('index');
});
 
db.sequelize.sync().then(function(){
    app.listen(PORT, function(){
        console.log("App listening on PORT " + PORT);
    });
});  