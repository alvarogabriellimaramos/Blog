const inputs = document.querySelectorAll('input');
const msg = document.querySelector(".msg");

const TokenStorage = async () => {
    const data = await fetch('/token',{
        headers: {"Content-Type": 'application/json'},
        method: 'POST',
        body: JSON.stringify({token: localStorage.token})
    });
    const {messagem} = await data.json();
    if (localStorage.token && messagem !== 'Token Invalído') {
        window.location.href = '/';
        return;
    }
    if (!localStorage.token && messagem === 'Token Invalído') return;
}

TokenStorage();
document.querySelector('form').addEventListener('submit',async event => {
    event.preventDefault();
    try {
        const data = await fetch('/login',{
            headers: {"Content-Type": 'application/json'},
            method: 'POST',
            body: JSON.stringify({username: inputs[0].value,password: inputs[1].value})
        });
        const {messagem,token} = await data.json()
        if (messagem === 'Esse usuario não existe' || messagem === 'Senha incorreta') {
            msg.textContent = messagem;
            return;
        }
        msg.textContent = '';
        localStorage.token = token;
        window.location.href = '/';
    }
    catch (e) {
        console.log(e)
    }
});