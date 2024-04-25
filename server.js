
const config = require("./src/config/config.js");
const database = require('./src/services/data/index');

const PORT = process.env.PORT || 8081;

database(function() {
    config.listen(PORT,() => console.log('Server Running ' + PORT));
})