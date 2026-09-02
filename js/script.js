// ==========================================
// 1. NAVEGAÇÃO E HEADER (GLOBAL)
// ==========================================

const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Menu Mobile (Hamburguer / Fechar)
const btnMenu = document.getElementById('btn-menu');
const navMenu = document.getElementById('nav-menu');

if (btnMenu && navMenu) {
    const menuIcon = btnMenu.querySelector('.material-symbols-outlined');

    btnMenu.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        if (menuIcon) {
            menuIcon.textContent = isOpen ? 'close' : 'menu';
        }
    });

    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (menuIcon) menuIcon.textContent = 'menu';
        });
    });
}

// ==========================================
// 2. ANIMAÇÃO DE SURGIMENTO (FADE-IN)
// ==========================================

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.10
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Faz os elementos/textos aparecerem
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(el => observer.observe(el));


// ==========================================
// 3. PÁGINA DE PRODUTO (CEP E CARRINHO)
// ==========================================

// Formatar o CEP automaticamente (00000-000)
const inputCep = document.getElementById('cep');
if (inputCep) {
    inputCep.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 5) {
            value = value.substring(0, 5) + '-' + value.substring(5, 8);
        }
        e.target.value = value;
    });
}

// Simular Cálculo de Frete
const btnCalcularCep = document.getElementById('btn-calcular-cep');
const resultadoCep = document.getElementById('resultado-cep');

if (btnCalcularCep && inputCep && resultadoCep) {
    btnCalcularCep.addEventListener('click', () => {
        const cepValue = inputCep.value;
        
        if (cepValue.length === 9) {
            resultadoCep.style.color = 'var(--cinza)';
            resultadoCep.textContent = 'Calculando...';
            
            setTimeout(() => {
                const valorFrete = (Math.random() * 150 + 50).toFixed(2).replace('.', ',');
                const dias = Math.floor(Math.random() * 10) + 3;
                
                resultadoCep.style.color = '#4caf50';
                resultadoCep.innerHTML = `<strong>Transportadora RFZ:</strong> R$ ${valorFrete} <br> Prazo estimado: ${dias} dias úteis.`;
            }, 800);
        } else {
            resultadoCep.style.color = 'var(--vermelho)';
            resultadoCep.textContent = 'Por favor, insira um CEP válido.';
        }
    });
}

// Botão Adicionar ao Carrinho (Feedback Visual)
const btnAddCarrinho = document.getElementById('btn-add-carrinho');
if (btnAddCarrinho) {
    btnAddCarrinho.addEventListener('click', function() {
        const textoOriginal = this.innerHTML;
        
        this.style.backgroundColor = '#4caf50';
        this.innerHTML = '<i class="material-symbols-outlined">check_circle</i> Adicionado!';
        
        setTimeout(() => {
            this.style.backgroundColor = 'var(--vermelho)';
            this.innerHTML = textoOriginal;
        }, 2500);
    });
}


// ==========================================
// 4. PÁGINA DO CARRINHO (QUANTIDADE E REMOÇÃO)
// ==========================================

const btnMinusList = document.querySelectorAll('.btn-qtd.minus');
const btnPlusList = document.querySelectorAll('.btn-qtd.plus');

btnMinusList.forEach(btn => {
    btn.addEventListener('click', function() {
        const input = this.nextElementSibling;
        if (input) {
            let valor = parseInt(input.value);
            if (valor > 1) input.value = valor - 1;
        }
    });
});

btnPlusList.forEach(btn => {
    btn.addEventListener('click', function() {
        const input = this.previousElementSibling;
        if (input) {
            let valor = parseInt(input.value);
            input.value = valor + 1;
        }
    });
});

const btnRemoverList = document.querySelectorAll('.btn-remover');
btnRemoverList.forEach(btn => {
    btn.addEventListener('click', function() {
        const item = this.closest('.item-carrinho');
        if (item) {
            item.style.opacity = '0';
            item.style.transition = 'opacity 0.3s ease';
            setTimeout(() => item.remove(), 300);
        }
    });
});