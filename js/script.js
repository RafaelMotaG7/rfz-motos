// --- LÓGICA DA PÁGINA DE PRODUTO ---

// 1. Formatar o CEP automaticamente (Colocar o traço)
const inputCep = document.getElementById('cep');
if (inputCep) {
    inputCep.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é número
        if (value.length > 5) {
            value = value.substring(0, 5) + '-' + value.substring(5, 8);
        }
        e.target.value = value;
    });
}

// 2. Simular Cálculo de Frete
const btnCalcularCep = document.getElementById('btn-calcular-cep');
const resultadoCep = document.getElementById('resultado-cep');

if (btnCalcularCep) {
    btnCalcularCep.addEventListener('click', () => {
        const cepValue = inputCep.value;
        
        if (cepValue.length === 9) {
            // Simulando uma requisição de API com setTimeout
            resultadoCep.style.color = 'var(--cinza)';
            resultadoCep.textContent = 'Calculando...';
            
            setTimeout(() => {
                // Resultados falsos para dar o efeito visual
                const valorFrete = (Math.random() * 150 + 50).toFixed(2).replace('.', ',');
                const dias = Math.floor(Math.random() * 10) + 3;
                
                resultadoCep.style.color = '#4caf50'; // Verde
                resultadoCep.innerHTML = `<strong>Transportadora RFZ:</strong> R$ ${valorFrete} <br> Prazo estimado: ${dias} dias úteis.`;
            }, 800);
        } else {
            resultadoCep.style.color = 'var(--vermelho)';
            resultadoCep.textContent = 'Por favor, insira um CEP válido.';
        }
    });
}

// 3. Adicionar ao Carrinho (Animação / Feedback)
const btnAddCarrinho = document.getElementById('btn-add-carrinho');

if (btnAddCarrinho) {
    btnAddCarrinho.addEventListener('click', function() {
        const icone = this.querySelector('i');
        const textoOriginal = this.innerHTML;
        
        // Altera o estado do botão para dar feedback ao usuário
        this.style.backgroundColor = '#4caf50'; // Fica verde
        this.innerHTML = '<i class="material-symbols-outlined">check_circle</i> Adicionado!';
        
        // Aqui você adicionaria a lógica para salvar no localStorage
        // let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        // carrinho.push({ id: 1, nome: 'BMW S1000 RR', preco: 139900.00 });
        // localStorage.setItem('carrinho', JSON.stringify(carrinho));

        // Retorna ao estado normal após 2.5 segundos
        setTimeout(() => {
            this.style.backgroundColor = 'var(--vermelho)';
            this.innerHTML = textoOriginal;
        }, 2500);
    });
}