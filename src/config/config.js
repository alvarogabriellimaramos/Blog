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
            return array.length
        },
        totalResponses: function(comments) {
            let total = 0;
            comments.forEach(comment => {
                total += comment.response.length;
            });
            return total;
        },
        eq: function(a,b) {return a === b},
        and: function(a,b) {
            return a && b
        },
        formatDate: function(date) {
            const Hour = new Date(date).toLocaleString();
            return Hour;
        },
        arrayIndex: function(array,index) {
            return array[index]
        }
    }
});

app.engine('handlebars',hbs.engine);
app.set('view engine','handlebars');
app.use('/tinymce',express.static('./node_modules/tinymce/tinymce.min.js'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(router);

module.exports = app;