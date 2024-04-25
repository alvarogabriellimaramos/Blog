

module.exports = function (request,response) {
    response.status(404).render("err/404",{
            title: 'Pagina não encontrada',
            PORT: process.env.PORT,
            cssFiles: [`http://localhost:8080/css/header.css`,'css/header.css','css/index.css'],
            jsFiles: [`http://localhost:8080/js/index.js`,'js/index.js'],
    });
};