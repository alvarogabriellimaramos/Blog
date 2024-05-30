const div__post = document.querySelectorAll('.div__post');
const div__form = document.querySelector(".div__form");

const search__text = document.querySelector('.search__text');
const search__input = document.querySelector('.search__input');
const post__loop = document.querySelector('.post__loop')

document.getElementById("form__search").addEventListener('submit', async event => {
    event.preventDefault();
    post__loop.innerHTML = '';
    try {
        div__post.forEach(div => div.style.display = 'none');
        const data = await fetch('/search', {
            headers: { 'Content-Type': "application/json" },
            method: "POST",
            body: JSON.stringify({ search: search__input.value })
        });
        const Json = await data.json();
        if (Json.messagem === "Postagem não encontrada") {
            search__text.style.display = 'block';
            return;
        };
        let response = 0
        for (let post of Json) {
            search__text.style.display = 'none';
            const existingPost = container__post.querySelector(`[data-post-id="${post.id}"]`);
            if (existingPost) continue;
            const Post = document.createElement('div');
            Post.classList.add('div__post');
            Post.setAttribute('data-post-id', post.id);
            try {
                post.comments.forEach(comment => {
                    response += comment.response.length
                })
                Post.innerHTML = `
                <div class="div__username">
                    <a href="/user/${post.id}">
                        <span>${post.username}</span>
                    </a>
                </div>
                <div class="div__title">
                    <strong>
                        <a href="/view-post/${post.id}/${post.postId}">${post.title}</a>
                    </strong>
                </div>
                <div class="div__likes__comments">
                    <span> Comentários: ${post.comments.length}</span> - 
                    <span> Respostas: ${response}</span> -
                    <span style="font-size:13px"> ${ new Date(post.date).toLocaleString()} </span>
                </div>
                `;
            }
            catch {
                Post.innerHTML = `
                <div class="div__username">
                    <a href="/user/${post.id}">
                        <span>${post.username}</span>
                    </a>
                </div>
                <div class="div__title">
                    <strong>
                        <a href="/view-post/${post.id}/${post.postId}">${post.title}</a>
                    </strong>
                </div>
                <div class="div__likes__comments">
                    <span> Comentários:${post.comments.length}</span> - 
                    <span> Respostas: 0 </span> -
                    <span style="font-size:13px"> ${ new Date(post.date).toLocaleString()} </span>
                </div>
        `;
            }
            post__loop.appendChild(Post);
        }

    }
    catch (e) { console.log(e) };
})