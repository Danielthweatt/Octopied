const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;
const exphbs  = require('express-handlebars');
const db = require("./models");
const routes = require("./controllers/controller.js");
require('dotenv').config();
 
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(routes);
 
db.sequelize.sync().then(function(){
    app.listen(PORT, function(){
        console.log("App listening on PORT " + PORT);
    });
});  