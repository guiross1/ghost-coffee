        document.getElementById('form-login')?.addEventListener('submit', function(event){
            event.preventDefault();
            
            const email = document.getElementById('email-login').value;
            const senha = document.getElementById('senha-login').value;
            const btnLogin = document.getElementById('btn-login');
            
            btnLogin.classList.add('loading');
            btnLogin.textContent = 'Entrando...';
            btnLogin.disabled = true;
            
            fetch(`http://localhost:3000/cadastros?email=${email}&senha=${senha}`)
                .then(response => response.json())
                .then(data => {
                    if(data.length > 0){
                        const usuarioLogado = {
                            id: data[0].id,
                            nome: data[0].nome
                        };
                        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
                        
                        btnLogin.textContent = 'Sucesso!';
                        btnLogin.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
                        
                        setTimeout(() => {
                            window.location.href = '../index.html';
                        }, 1000);
                        
                    } else {
                        btnLogin.classList.remove('loading');
                        btnLogin.textContent = 'Acessar';
                        btnLogin.disabled = false;
                        
                        alert('Email ou senha incorretos! Tente novamente.');
                    }
                }).catch(error => {
                    console.error('Erro ao fazer o login: ', error);
                    
                    btnLogin.classList.remove('loading');
                    btnLogin.textContent = 'Acessar';
                    btnLogin.disabled = false;
                    
                    alert('Erro ao fazer o login. Tente novamente.');
                })
        });

        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('email-login').focus();
        });

        const inputs = document.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });