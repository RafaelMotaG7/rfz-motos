// 1. Mudar o visual do Header ao rolar a página
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 2. Lógica do Menu Mobile (Hamburguer / Fechar)
const btnMenu = document.getElementById('btn-menu');
const navMenu = document.getElementById('nav-menu');
const menuIcon = btnMenu.querySelector('.material-symbols-outlined');

btnMenu.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    
    // Troca dinamicamente o ícone do botão entre o menu hambúrguer e o X
    menuIcon.textContent = isOpen ? 'close' : 'menu';
});

// Fecha o menu ao clicar em qualquer opção da navegação
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuIcon.textContent = 'menu';
    });
});

// 3. Efeito de surgimento suave (Fade In) ao rolar a tela
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.10
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(el => observer.observe(el));