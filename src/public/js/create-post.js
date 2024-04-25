const form = document.querySelector("form");
const input = document.querySelector("input");
const textarea = document.querySelector("textarea");

form.addEventListener('submit',async event => {
    try {
        event.preventDefault();
        const data = await fetch('/create-post',{
            headers: {
                "Authorization":localStorage.token,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                title:input.value,
                text: textarea.value
            })
        });
        if (data.redirected) {
            window.location.href = data.url;
            return;
        }
    }
    catch (e) {
        console.log(e);
    }
});
