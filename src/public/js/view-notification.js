// arquivo responsável por lida com as ações nas notificações 

const div__notification = document.querySelectorAll('.notification');
const Delete = document.querySelectorAll('#delete');

div__notification.forEach(function(notification,index) {
    Delete[index].addEventListener('click',async function () {
        const data = await fetch(`/delete-notification?token=${localStorage.token}`,{
            headers: {
                "Content-Type": "application/json"
            },
            method: 'DELETE',
            body: JSON.stringify({index:index})
        })
        const {messagem} = await data.json();
        if (messagem === 'Você precisa está logado') {
            alert(messagem);
            return;
        };
        window.location.reload();
    });
})