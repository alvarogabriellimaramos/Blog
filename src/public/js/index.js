const nav__menu = document.querySelector(".nav__menu");
const nav__cont = document.querySelector('.nav__cont');
const span__text = document.querySelector('.span__text');


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
    if (window.innerWidth <= 630) {
        menu__open.style.display = 'block';
        close__menu.style.display = 'none';
        navs.forEach(nav => nav.style.display = 'none');
        return;
    };
    if (window.innerWidth > 630) {
        navs.forEach(nav => nav.style.display = 'flex');
        menu__open.style.display = 'none';
        close__menu.style.display = 'none';
        MenusDisplay()
    }
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
