const tls = require('tls');

const options = {
    host: 'localhost', // substitua pelo seu domínio
    port: 8080,          // porta padrão para HTTPS
};

const socket = tls.connect(options, () => {
    console.log('Conexão segura estabelecida');

    const cert = socket.getPeerCertificate();
    console.log('Informações do certificado do servidor:', cert);

    if (cert && cert.subject) {
        console.log('O certificado é válido!');
    } else {
        console.log('O certificado é inválido ou não foi fornecido.');
    }

    socket.end();
});

socket.on('error', (error) => {
    console.error('Erro ao estabelecer conexão segura:', error);
});
