// arquivo responsável por renderizar perfis de outros usuarios

const container = document.querySelector(".container");

const div__post = document.querySelectorAll('.div__post');
const div__profile = document.querySelector('.div__profile');
const posts = document.getElementById("posts");
const profile = document.getElementById('profile');

profile.addEventListener('click',function(){
    div__post.forEach(div => div.style.display = 'none');
    div__profile.style.display = 'flex';
})
posts.addEventListener('click',function(){
    div__post.forEach(div => div.style.display = 'block')
    div__profile.style.display = 'none';
});

