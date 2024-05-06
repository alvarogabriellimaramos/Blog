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
        window.location.reload();
    });
})