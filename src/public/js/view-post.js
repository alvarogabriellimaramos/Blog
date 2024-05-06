const form = document.querySelector('.create__comments');
const textarea = document.querySelector("textarea");

form.addEventListener('submit', async function (event) {
    event.preventDefault();
    try {
        const data = await fetch(`/create-comments?user=${user}&post=${idPost}`, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": localStorage.token
            },
            method: 'POST',
            body: JSON.stringify({ comment: textarea.value })
        });
        const DataJson = await data.json();
        if (DataJson.messagem === "Comentário criado com sucesso") {
            window.location.reload();
            return;
        };
        if (DataJson.messagem === 'Token Inválido') {
            alert('Você precisa está logado para fazer um comentário');
            return
        };
        alert(DataJson.messagem);
    }
    catch (e) {
        console.log(e);
    }
});

const form__response__comments = document.querySelectorAll('.form__response__comments');

form__response__comments.forEach(function(form,index){
    const textarea = document.querySelectorAll('#response__comment');
    form.addEventListener('submit',async (event) => {
        event.preventDefault();
        const data = await fetch(`/response-comments?user=${user}&post=${idPost}`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.token
            },
            method: 'POST',
            body: JSON.stringify({
                response__comment: textarea[index].value,
                index
            })
        });
        const DataJson = await data.json();
        if (DataJson === 'true') {
            window.location.reload();
            return;
        }
        if (DataJson.messagem === 'Token Inválido') {
            alert('Você precisa está logado para responder um comentário');
            return;
        }
        alert(DataJson.messagem)
    })
})