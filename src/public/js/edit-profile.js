const form = document.querySelector("form");
const input = document.querySelector("input");

const span__biografy = document.querySelector('.span__biografy');

const span__text = document.querySelector(".span__text");
export function setup(editor) {
    editor.on('init', function () {
        tinymce.get("biography").setContent(span__biografy.innerHTML);
        form.addEventListener('submit',async function (event) {
            const BodyBio = tinymce.get('biography').getContent();
            try {
                event.preventDefault();
                const data = await fetch(`/edit-profile?token=${localStorage.token}`,{
                    headers: {'Content-Type': "application/json"},
                    method: 'PUT',
                    body: JSON.stringify({
                        user:input.value,
                        body: BodyBio
                    })
                });
                const DataJson = await data.json();
                if (DataJson.messagem === 'Perfil atualizado com sucesso') {
                    window.location.reload();
                    return;
                }
                alert(DataJson.messagem);
            }
            catch (e) {console.log(e)};
        });
    })
}
