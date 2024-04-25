document.getElementById('logout').addEventListener('click',async () => {
    try {
        const data = await fetch('/logout',{
            headers: {"Authorization": localStorage.token},
            method: 'DELETE',
        });
        console.log(data);
    }
    catch (e) {
        console.log(e);
    }
})