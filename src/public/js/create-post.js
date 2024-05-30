// arquivo para crianção de post 

const form = document.querySelector("form");
const input = document.querySelector("input");

const select = document.querySelector('select');

export function setup(editor) {
  // quando o tinymce for inicializado a função dentro do evento será ativada
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
                        category: select.value
                    })
                });
                if (data.redirected) {
                    window.location.href = data.url;
                    return;
                }
                if (!data.redirected) {
                    const {messagem} = await data.json();
                    alert(messagem);
                };
            }
            catch (e) {
                console.log(e);
            }
        });
    });
}
