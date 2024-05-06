

module.exports = function (request,response) {
    response.status(404).render("err/404",{
            title: 'Pagina não encontrada',
            PORT: process.env.PORT,
            cssFiles: [`http://localhost:8080/css/header.css`,'http://localhost:8080/css/index.css','http://localhost:8080/css/err/404.css'],
            jsFiles: [`http://localhost:8080/js/index.js`,'js/index.js'],
            img: 'http://localhost:8080/imgs/node.png'
    });
};