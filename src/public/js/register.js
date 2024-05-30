// arquivo responsável por lida com o registro do usuario

const form = document.querySelector("form");
const button = document.querySelector('button');

const inputs = document.querySelectorAll('input');
const text = document.querySelector(".text");

form.addEventListener('submit',async event => {
    event.preventDefault();
    try {
        
        const data = await fetch('/sendToken',{
            headers: {"Content-Type": 'application/json'},
            method: 'POST',
            body: JSON.stringify({
                username: inputs[0].value,
                email: inputs[1].value,
                password: inputs[2].value,
                confirmPass: inputs[3].value
            })
        });
        const DataJson = await data.json();
        console.log(DataJson)
        if (DataJson.messagem !== 'Enviamos um token de verificação para o seu e-mail') {
            text.textContent = DataJson.messagem;
            button.disabled = false;
            return;
        };
        text.textContent = DataJson.messagem;
        button.disabled = true;
    }
    catch (e) {
        console.log(e);
    }
})