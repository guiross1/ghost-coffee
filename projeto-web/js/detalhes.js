const parametros = new URLSearchParams(window.location.search);
        const idProduto = parametros.get('id');

        if (!idProduto) {
            document.getElementById('detalhes-produto').innerHTML = `
                <div class="error">
                    <h2>Produto não encontrado</h2>
                    <p>ID do produto não foi fornecido.</p>
                    <div class="actions">
                        <a class="btn btn-info" href="../index.html">
                            Voltar para o cardápio
                        </a>
                    </div>
                </div>
            `;
        } else {

            fetch(`http://localhost:3000/menu/${idProduto}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Produto não encontrado');
                    }
                    return response.json();
                })
                .then(produto => {
                    const detalhesProduto = document.getElementById('detalhes-produto');
                    
                    detalhesProduto.innerHTML = `
                        <img src="../${produto.imagem}" 
                             alt="${produto.nome}" 
                             class="product-image" />
                        <h2 class="product-name">${produto.nome}</h2>
                        <p class="product-description">${produto.descricao}</p>
                        <h3 class="product-price">R$ ${produto.preco.toFixed(2).replace('.', ',')}</h3>
                        
                        <div class="actions">
                            <a class="btn btn-info" href="../index.html">
                                Voltar para o cardápio
                            </a>
                            <button class="btn btn-primary" onclick="adicionarAoCarrinho(${produto.id}, '${produto.nome}', ${produto.preco})">
                                Adicionar ao Carrinho
                            </button>
                        </div>
                    `;
                })
                .catch(error => {
                    console.error('Erro ao carregar os detalhes do produto selecionado: ', error);
                    
                    document.getElementById('detalhes-produto').innerHTML = `
                        <div class="error">
                            <h2>Erro ao carregar produto</h2>
                            <p>Não foi possível carregar os detalhes do produto selecionado.</p>
                            <div class="actions">
                                <a class="btn btn-info" href="../index.html">
                                    Voltar para o cardápio
                                </a>
                            </div>
                        </div>
                    `;
                });
        }

        // Função para adicionar ao carrinho
        function adicionarAoCarrinho(id, nome, preco) {
            let pedido = JSON.parse(localStorage.getItem('pedido')) || [];
            
            const itemExistente = pedido.find(item => item.id == id);
            if(itemExistente) {
                itemExistente.quantidade++;
            } else {
                pedido.push({id: parseInt(id), nome, preco: parseFloat(preco), quantidade: 1});
            }
            
            localStorage.setItem('pedido', JSON.stringify(pedido));
            
            // Feedback visual
            const button = event.target;
            const originalText = button.textContent;
            const originalBackground = button.style.background;
            
            button.textContent = 'Adicionado!';
            button.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = originalBackground;
                button.disabled = false;
            }, 2000);
        }

        // Adicionar animação de entrada para a imagem quando carregar
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => {
                const image = document.querySelector('.product-image');
                if (image) {
                    image.addEventListener('load', function() {
                        this.style.animation = 'slideIn 0.6s ease';
                    });
                }
            }, 500);
        });