// 1. Mudar o visual do Header ao rolar a página
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 2. Lógica do Menu Mobile (Hamburguer)
const btnMenu = document.getElementById('btn-menu');
const navMenu = document.getElementById('nav-menu');

btnMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Troca o ícone de menu para um 'X' quando aberto
    const icon = btnMenu.querySelector('i');
    if(navMenu.classList.contains('active')) {
        icon.textContent = 'close';
    } else {
        icon.textContent = 'menu';
    }
});

// Fecha o menu ao clicar em um link (versão mobile)
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        btnMenu.querySelector('i').textContent = 'menu';
    });
});

// 3. Efeito de surgimento suave (Fade In) ao rolar a tela usando Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Dispara quando 15% do elemento estiver visível
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Para de observar depois de animar 1 vez
        }
    });
}, observerOptions);

// Pega todos os elementos que têm a classe 'fade-in' e começa a observar
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(el => observer.observe(el));