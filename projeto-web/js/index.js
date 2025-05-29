function verificarAutenticacao() {
    const usuarioLogado = obterUsuarioLogado();
    const paginaAtual = window.location.pathname;
    
    if (!usuarioLogado && (paginaAtual.endsWith('index.html') || paginaAtual === '/' || paginaAtual.endsWith('/'))) {
        window.location.href = "paginas/login.html";
        return false;
    }
    
    return true;
}

function salvarUsuarioLogado(usuario){
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario))
}

function obterUsuarioLogado(){
    const usuario = localStorage.getItem('usuarioLogado')
    return usuario ? JSON.parse(usuario) : null;
}

function verificarLinkButton(){
    const usuarioLogado = obterUsuarioLogado();
    const menuHistorico = document.getElementById('menu-historico');
    const buttonLogout = document.getElementById('button-logout');
    const mensagemBoasVindas = document.getElementById('mensagem-boas-vindas');
    
    if(usuarioLogado){
        menuHistorico.classList.remove('hidden');
        buttonLogout.classList.remove('hidden');
        mensagemBoasVindas.classList.remove('hidden');
        mensagemBoasVindas.textContent = `${usuarioLogado.nome}, seja bem-vindo. Tome um café!`;
    } else {
        menuHistorico.classList.add('hidden');
        buttonLogout.classList.add('hidden');
        mensagemBoasVindas.classList.add('hidden');       
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (!verificarAutenticacao()) {
        return;
    }
    
    verificarLinkButton();
    carregarMenu();
    atualizarPedido();
    
    const btnFinalizarPedido = document.getElementById('finalizar-pedido');
    if(btnFinalizarPedido){
        btnFinalizarPedido.addEventListener('click', finalizarPedido);
    }
    
    const btnLogout = document.getElementById('button-logout');
    if(btnLogout){
        btnLogout.addEventListener('click', logout);
    }
});

const menuItens = document.getElementById('menu-itens');
const pedidoItens = document.getElementById('pedido-itens');
const totalPedido = document.getElementById('total-pedido');

function obterPedido() {
    return JSON.parse(localStorage.getItem('pedido')) || [];
}

function salvarPedido(pedido) {
    localStorage.setItem('pedido', JSON.stringify(pedido));
}

function carregarMenu() {
    fetch('http://localhost:3000/menu')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    <img src="${item.imagem}" 
                         class="product-image" 
                         alt="${item.nome}" />
                    <div class="product-info">
                        <div class="product-name">${item.nome}</div>
                        <div class="product-price">R$ ${item.preco.toFixed(2).replace('.', ',')}</div>
                        <div class="product-buttons">
                            <button class="btn btn-info" onclick="redirecionarParaDetalhes(${item.id})">
                                Ver Detalhes
                            </button>
                            <button class="add-to-cart" onclick="adicionarAoPedido(${item.id}, '${item.nome}', '${item.preco}')">
                                Adicionar ao Carrinho
                            </button>
                        </div>
                    </div>
                `;
                menuItens.appendChild(card);
            });
        }).catch(error => console.error('Erro ao carregar o cardápio:', error));
}

function adicionarAoPedido(id, nome, preco){
    let pedido = obterPedido();
    
    const itemExistente = pedido.find(item => item.id == id);
    if(itemExistente){
        itemExistente.quantidade++;
    } else {
        pedido.push({id: parseInt(id), nome, preco: parseFloat(preco), quantidade: 1})
    }
    
    salvarPedido(pedido); 
    atualizarPedido();

    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Adicionado!';
    button.style.background = '#28a745';
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 1000);
}

function atualizarPedido(){
    if (!pedidoItens) return;
    
    pedidoItens.innerHTML = '';
    let total = 0;
    let pedido = obterPedido(); 

    pedido.forEach(item => {
        total += item.preco * item.quantidade;
        const row = document.createElement('tr');  
        row.innerHTML = `
            <td>${item.nome}</td>
            <td>${item.quantidade}</td>
            <td>R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</td>
            <td>
                <button class="btn btn-danger" onclick="removerDoPedido(${item.id})">
                    Remover
                </button>
            </td>`;
        pedidoItens.appendChild(row);
    });
    
    if (totalPedido) {
        totalPedido.textContent = total.toFixed(2).replace('.', ',');
    }
}

function removerDoPedido(id){
    let pedido = obterPedido(); 
    pedido = pedido.filter(item => item.id != id);
    salvarPedido(pedido); 
    atualizarPedido(); 
}

function redirecionarParaDetalhes(id){
    window.location.href = `paginas/detalhes.html?id=${id}`
}

function finalizarPedido(){
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if(!usuarioLogado){
        alert('Você precisa fazer o login para finalizar o pedido.');
        return;
    }
    
    let pedido = obterPedido();
    if(pedido.length === 0){
        alert(`${usuarioLogado.nome}, seu pedido está vazio!`);
        return;
    }
    
    const idPedido = Math.random().toString(36).substring(2, 6);
    const novoPedido = {
        id: idPedido,
        usuarioId: usuarioLogado.id,
        data: new Date().toISOString(),
        status: "Feito",
        itens: pedido
    };
    
    fetch('http://localhost:3000/pedidos', {
        method: 'POST' , 
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(novoPedido)
    })
    .then(response => response.json())
    .then(data => {
        alert('Pedido realizado com sucesso!');
        localStorage.removeItem('pedido'); 
        atualizarPedido();
    }).catch(error => {
        console.error('Erro ao salvar o pedido: ', error);
        alert('Erro ao salvar o pedido!');
    })
}

function logout(){
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('pedido');
    window.location.href = "paginas/login.html";
}