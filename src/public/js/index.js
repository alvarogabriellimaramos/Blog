// arquivo principal da página 
const container__post = document.querySelector(".container__post");

const nav__menu = document.querySelector(".nav__menu");
const nav__cont = document.querySelector('.nav__cont');
const span__text = document.querySelector('.span__text');

document.querySelector('.div__icon').addEventListener('click',function() {
    window.location.href = '/';
});
// verifica se o token do localStorage é valido
async function TokenStorage() {
    if (localStorage.token === undefined) {
        return;
    };
    const data = await fetch('/token',{
        headers: {"Content-Type": 'application/json'},
        method: 'POST',
        body: JSON.stringify({token: localStorage.token})
    });
    const {messagem} = await data.json();
    return messagem;
};
// depedendo da condição algum menu será acionado
async function MenusDisplay () {
    const data = await TokenStorage();
    if (localStorage.token && data !== 'Token Invalído') {
        nav__menu.style.display = 'none';
        nav__cont.style.display = 'flex';
        return;
    };
    nav__menu.style.display = 'flex';
    nav__cont.style.display = 'none';
};
// responsável por lida com o logout do usuario
document.getElementById('logout').addEventListener('click',async () => {
    try {
        const data = await fetch('/logout',{
            headers: {"Authorization": localStorage.token},
            method: 'DELETE'
        });
        const {logout} = await data.json();
        if (logout) {
            localStorage.removeItem('token');
            window.location.href = '/';
        };
    }
    catch (e) {
        console.log(e);
    };
});
const navs = document.querySelectorAll('.nav');

const menu__open = document.getElementById('open__menu');
const close__menu = document.getElementById('close__menu');

window.addEventListener("resize",async function() {
    if (window.innerWidth <= 650) {
        menu__open.style.display = 'block';
        close__menu.style.display = 'none';
        navs.forEach(nav => nav.style.display = 'none');
        return;
    };
    if (window.innerWidth > 650) {
        navs.forEach(nav => nav.style.display = 'flex');
        menu__open.style.display = 'none';
        close__menu.style.display = 'none';
        MenusDisplay()
    }
});

window.addEventListener('load',function() {
    if (window.innerWidth > 650) {
        close__menu.style.display = 'none';
        return;
    }
    close__menu.style.display = 'block';
});

menu__open.addEventListener('click',async function() {
    menu__open.style.display = 'none';
    close__menu.style.display = 'block';
    const data = await TokenStorage();
    if (localStorage.token && data !== 'Token Invalído') {
        navs[1].style.display = 'flex';
        return;
    }
    navs[0].style.display = 'flex';
})
MenusDisplay()

close__menu.addEventListener("click",function() {
    menu__open.style.display = 'block';
    close__menu.style.display = 'none';
    navs.forEach(nav => nav.style.display = 'none');
});

// retorna o numero de notificações para o usuario
const Notifications = async () => {
    try {
        const notification = document.querySelector(".number__notification");
        const data = await fetch("/notification",{
            headers: {"Authorization": localStorage.token},
            method: "GET"
        });
        const DataJson = await data.json();
        notification.textContent = DataJson.notification;
    }
    catch (e) {
        console.log(e);
    }
}

Notifications();
const form__search = document.getElementById('form__search');
document.getElementById('notification').addEventListener('click',function() {
    window.location.href = `/view-notification?token=${localStorage.token}`;
});

document.getElementById('edit-profile').addEventListener('click',function () {
    window.location.href = `/edit-profile?token=${localStorage.token}`;
});

document.getElementById('my-post').addEventListener('click',function () {
    window.location.href = `/my-post?token=${localStorage.token}`;
});
