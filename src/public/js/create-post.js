const form = document.querySelector("form");
const input = document.querySelector("input");

export function setup(editor) {
    editor.on('init', function () {
        form.addEventListener('submit', async event => {
            try {
                event.preventDefault();
                const content = tinymce.get('body').getContent();
                const data = await fetch('/create-post', {
                    headers: {
                        "Authorization": localStorage.token,
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({
                        title: input.value,
                        body: content,
                    })
                });
                if (data.redirected) {
                    window.location.href = data.url;
                    return;
                }
                if (!data.redirected) {
                    const {messagem} = await data.json();
                    if (messagem === 'Token Inválido') {
                        alert('Você precisa está logado')
                        return;
                    }
                    alert(messagem);
                }
            }
            catch (e) {
                console.log(e);
            }
        });
    });
}
