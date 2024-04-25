// modulo responsável pelas principais configurações do projeto 

const express = require('express');
const exphbs = require('express-handlebars');
require('dotenv').config();

const router = require('../routers/router');

const app = express();

const hbs = exphbs.create({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    },
    helpers: {
        lt: function(a,b) {
            return a < b;
        },
        length: function(array) {
            return array.length;
        },
        eq: function(a,b) {return a === b},
        formatDate: function(date) {
            return new Date(date).toLocaleString();
        }
    }
});

app.engine('handlebars',hbs.engine);
app.set('view engine','handlebars');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(router);

module.exports = app;