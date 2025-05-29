function obterUsuarioLogado(){
            const usuario = localStorage.getItem('usuarioLogado');
            return usuario ? JSON.parse(usuario) : null;
        }

        function verificarLinkButton(){
            const usuarioLogado = obterUsuarioLogado();
            const buttonLogout = document.getElementById('button-logout');
            const mensagemBoasVindas = document.getElementById('mensagem-boas-vindas');
            
            if(usuarioLogado){
                mensagemBoasVindas.textContent = `Olá, ${usuarioLogado.nome}!`;
            } else {

                window.location.href = 'login.html';
            }
        }

        function logout(){
            localStorage.removeItem('usuarioLogado');
            window.location.href = "../index.html";
        }

        function formatarData(dataIso) {
            const data = new Date(dataIso);
            return data.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        function formatarItens(itens) {
            return itens.map(item => `${item.nome} (${item.quantidade}x)`).join(', ');
        }

        function calcularTotal(itens) {
            return itens.reduce((total, item) => {
                return total + (parseFloat(item.preco) * parseInt(item.quantidade));
            }, 0);
        }

        function carregarPedidos() {
            const usuarioLogado = obterUsuarioLogado();
            if (!usuarioLogado) return;

            fetch(`http://localhost:3000/pedidos?usuarioId=${usuarioLogado.id}`)
                .then(response => response.json())
                .then(pedidos => {
                    const loadingContainer = document.getElementById('loading-container');
                    const tableContainer = document.getElementById('table-container');
                    const emptyState = document.getElementById('empty-state');
                    const listaPedidos = document.getElementById('lista-pedidos');
                    
                    loadingContainer.classList.add('hidden');
                    
                    if (pedidos.length === 0) {
                        emptyState.classList.remove('hidden');
                        return;
                    }
                    
                    tableContainer.classList.remove('hidden');
                    listaPedidos.innerHTML = '';
                    
                    pedidos.sort((a, b) => new Date(b.data) - new Date(a.data));
                    
                    pedidos.forEach(pedido => {
                        const row = document.createElement('tr');
                        const total = calcularTotal(pedido.itens);
                        const statusClass = pedido.status ? `status-${pedido.status.toLowerCase()}` : 'status-feito';
                        
                        row.innerHTML = `
                            <td class="order-id">#${pedido.id.toUpperCase()}</td>
                            <td class="order-date">${formatarData(pedido.data)}</td>
                            <td><span class="order-status ${statusClass}">${pedido.status || 'Feito'}</span></td>
                            <td class="order-items" title="${formatarItens(pedido.itens)}">${formatarItens(pedido.itens)}</td>
                            <td class="order-total">R$ ${total.toFixed(2).replace('.', ',')}</td>
                        `;
                        row.style.opacity = '0';
                        row.style.transform = 'translateY(20px)';
                        listaPedidos.appendChild(row);
                        
                        setTimeout(() => {
                            row.style.transition = 'all 0.3s ease';
                            row.style.opacity = '1';
                            row.style.transform = 'translateY(0)';
                        }, 100);
                    });
                })
                .catch(error => {
                    console.error('Erro ao carregar pedidos:', error);
                    
                    const loadingContainer = document.getElementById('loading-container');
                    const emptyState = document.getElementById('empty-state');
                    
                    loadingContainer.classList.add('hidden');
                    emptyState.innerHTML = `
                        <h3>Erro ao carregar pedidos</h3>
                        <p>Não foi possível carregar seus pedidos. Tente novamente mais tarde.</p>
                        <button onclick="location.reload()" class="btn btn-info">
                            Tentar Novamente
                        </button>
                    `;
                    emptyState.classList.remove('hidden');
                });
        }

        document.addEventListener('DOMContentLoaded', function() {
            verificarLinkButton();
            carregarPedidos();
        });

        document.getElementById('button-logout')?.addEventListener('click', logout);

        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => {
                const orderItems = document.querySelectorAll('.order-items');
                orderItems.forEach(item => {
                    if (item.scrollWidth > item.clientWidth) {
                        item.style.cursor = 'help';
                    }
                });
            }, 1000);
        });