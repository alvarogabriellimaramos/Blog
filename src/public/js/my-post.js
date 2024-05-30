const Delete = document.querySelectorAll('#delete');
Delete.forEach(function(button,index) {
    button.addEventListener('click',async function () {
        const data = await fetch(`/delete-post?token=${localStorage.token}`,{
            headers: {"Content-Type": "application/json"},
            method: 'DELETE',
            body: JSON.stringify({index})
        });
        const {messagem} = await data.json();
        if (messagem === 'Post apagado com sucesso') {
            window.location.reload();
            return;
        };
        if (messagem === 'Token Invalído') {
            alert('Você precisa está logado');
            return;
        };
        alert(messagem);
    });
});