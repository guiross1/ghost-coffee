👻 Cafeteria Online Projeto pedido pelo Professor MARCIO KATSUMI OIKAWA na matéria de Desenvolvimento Front-End. 

🎯 Sobre o Projeto A Cafeteria Online é uma aplicação web completa que permite aos usuários navegar pelo cardápio, fazer pedidos e acompanhar seu histórico. O projeto foi desenvolvido com foco em design moderno, utilizando técnicas como glassmorphism, gradientes e animações suaves para proporcionar uma experiência única. 
✨ Funcionalidades 
🔐 Autenticação

Cadastro de novos usuários Login com validação Sessão persistente (localStorage) Logout seguro

🍽️ Cardápio

Visualização de produtos em grid responsivo Detalhes completos de cada produto Imagens em alta qualidade Preços atualizados

🛒 Sistema de Pedidos

Adicionar itens ao carrinho Controle de quantidades Cálculo automático do total Finalização de pedidos (apenas usuários logados)

📊 Histórico

Visualização de pedidos anteriores Status dos pedidos Data e hora detalhadas Valor total por pedido

🎨 Design Moderno Características Visuais

Glassmorphism: Efeitos de vidro fosco nas seções Gradientes: Cores suaves e elegantes Animações: Transições suaves em hover e focus Responsividade: Adaptável a todos os dispositivos Microinterações: Feedback visual em todas as ações

Paleta de Cores

Primária: Tons de marrom (#8B4513, #A0522D, #6B4E3D) Secundária: Verde (#28a745), Azul (#17a2b8), Vermelho (#dc3545) Neutras: Branco translúcido, cinzas suaves

🛠️ Tecnologias Utilizadas

Frontend: HTML5, CSS3, JavaScript ES6+ Backend: JSON Server (simulação de API REST) Design: CSS Grid, Flexbox, Gradientes, Backdrop-filter Armazenamento: LocalStorage para sessões e carrinho Responsividade: Mobile-first approach

📁 Estrutura do Projeto
cafeteria-online/
├── index.html              # Página principal
├── css/
│   └── cadastro.css        # Estilos do Cadastro
│   └── detalhes.css        # Estilos do Detalhes
│   └── estilos.css         # Estilos principais
│   └── historico.css       # Estilos do Histórico
│   └── login.css           # Estilos do Login
├── db.json                 # Banco de dados JSON
├── js/
│   ├── index.js            # JavaScript da página principal
│   ├── login.js            # Lógica de login
│   ├── login-redirect.js   # Lógica de Inicial
│   ├── cadastro.js         # Lógica de cadastro
│   ├── detalhes.js         # Detalhes do produto
│   └── historico.js        # Histórico de pedidos
├── paginas/
│   ├── login.html          # Página de login
│   ├── cadastro.html       # Página de cadastro
│   ├── detalhes.html       # Detalhes do produto
│   └── historico.html      # Histórico de pedidos
├── imagens/                # Imagens dos produtos
│   ├── cafe-expresso.jpg
│   ├── cappuccino.jpg
│   ├── sanduiche-natural.jpg
│   ├── suco-laranja.jpg
│   ├── bolo-chocolate.jpg
│   └── torrada-manteiga.jpg
└── README.md               # Documentação 
🚀 Como Executar Pré-requisitos

Node.js instalado npm ou yarn

Instalação

Clone o repositório

bashgit clone https://github.com/seu-usuario/ghost-coffee.git 
cd ghost-coffee

Instale o JSON Server

bashnpm install -g json-server

Execute o servidor de dados

bashjson-server --watch db.json --port 3000

Abra o projeto

Abra o arquivo index.html no navegador Ou use um servidor local como Live Server (VS Code)

URLs Importantes

Aplicação: http://localhost:5500 (ou porta do seu servidor) API: http://localhost:3000 Dados: http://localhost:3000/menu, http://localhost:3000/cadastros, http://localhost:3000/pedidos

📱 Responsividade O projeto foi desenvolvido com abordagem mobile-first e é totalmente responsivo:

Desktop: Layout em grid com 3 colunas Tablet: Layout em grid com 2 colunas Mobile: Layout em coluna única Micro-interações: Adaptadas para touch

🔧 Funcionalidades Técnicas Gerenciamento de Estado

LocalStorage para persistência de dados Controle de sessão de usuário Cache do carrinho de compras

API REST Simulada

CRUD completo para usuários Gestão de produtos Histórico de pedidos Validações de email único

Validações

Formulários com validação em tempo real Verificação de força de senha Campos obrigatórios Feedback visual de erros

🎯 Melhorias Implementadas UX/UI

✅ Loading states em todas as operações ✅ Feedback visual para ações do usuário ✅ Animações suaves e naturais ✅ Breadcrumbs para navegação ✅ Estados vazios bem definidos

Performance

✅ Imagens otimizadas ✅ CSS minificado e organizado ✅ JavaScript modular ✅ Lazy loading para conteúdo

Acessibilidade

✅ Contraste adequado ✅ Focus visível ✅ Textos alternativos ✅ Navegação por teclado

📊 Estrutura do Banco de Dados Menu (/menu) json{ "id": "1", "nome": "Café Expresso", "preco": 5.5, "imagem": "imagens/cafe-expresso.jpg", "descricao": "Um café forte e aromático..." } Usuários (/cadastros) json{ "id": "abc123", "nome": "João Silva", "email": "teste123@gmail.com", "senha": "Teste123" } Pedidos (/pedidos) json{ "id": "xyz789", "usuarioId": "abc123", "data": "2025-01-15T10:30:00.000Z", "status": "Feito", "itens": [...] } 🤝 Contribuição Contribuições são sempre bem-vindas! Para contribuir:

Fork o projeto Crie uma branch para sua feature (git checkout -b feature/AmazingFeature) Commit suas mudanças (git commit -m 'Add some AmazingFeature') Push para a branch (git push origin feature/AmazingFeature) Abra um Pull Request

📋 Roadmap Funcionalidades Futuras

Sistema de avaliações Cupons de desconto Notificações em tempo real Integração com pagamentos Chat de suporte Sistema de favoritos Programa de fidelidade

Melhorias Técnicas

PWA (Progressive Web App) Service Workers Testes automatizados CI/CD pipeline Docker containerization

🐛 Problemas Conhecidos

Refresh manual necessário após logout Validação de email poderia ser mais robusta Falta tratamento para falhas de rede

📞 Contato Desenvolvedor: [Guilherme Rossi dos Santos e Pedro Vasconcelos]

Email: guilherme.santos9@uscsonline.com.br
