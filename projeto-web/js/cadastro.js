document.getElementById('senha-cadastro').addEventListener('input', function() {
            const password = this.value;
            const strengthBar = document.getElementById('strength-bar');
            
            let strength = 0;
            if (password.length >= 6) strength++;
            if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
            if (password.match(/\d/)) strength++;
            if (password.match(/[^a-zA-Z\d]/)) strength++;
            
            strengthBar.className = 'password-strength-bar';
            if (strength === 1) strengthBar.className += ' weak';
            else if (strength === 2) strengthBar.className += ' fair';
            else if (strength === 3) strengthBar.className += ' good';
            else if (strength === 4) strengthBar.className += ' strong';
        });

        document.getElementById('form-cadastro')?.addEventListener('submit', function(event){ 
            event.preventDefault();
            
            const nome = document.getElementById('nome-cadastro').value;
            const email = document.getElementById('email-cadastro').value;
            const senha = document.getElementById('senha-cadastro').value;
            const id = Math.random().toString(36).substring(2, 6);
            const btnCadastro = document.getElementById('btn-cadastro');

            if (nome.length < 2) {
                alert('Nome deve ter pelo menos 2 caracteres');
                return;
            }
            
            if (senha.length < 6) {
                alert('Senha deve ter pelo menos 6 caracteres');
                return;
            }

            btnCadastro.classList.add('loading');
            btnCadastro.textContent = 'Cadastrando...';
            btnCadastro.disabled = true;
            
            fetch(`http://localhost:3000/cadastros?email=${email}`) 
                .then(response => response.json())
                .then(data => {
                    if(data.length > 0){

                        btnCadastro.classList.remove('loading');
                        btnCadastro.textContent = 'Cadastrar';
                        btnCadastro.disabled = false;
                        
                        alert('Este email já está cadastrado!')
                    } else {
                        fetch('http://localhost:3000/cadastros', {
                            method: 'POST',
                            headers: {'Content-Type' : 'application/json'},
                            body: JSON.stringify({id, nome, email, senha})
                        })
                        .then(response => {
                            console.log('resposta do servidor: ', response);
                            return response.json();
                        })
                        .then(data => {
                            console.log('Dados cadastrados:', data);

                            btnCadastro.textContent = 'Sucesso!';
                            btnCadastro.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
                            
                            alert('Cadastro feito com sucesso!');

                            setTimeout(() => {
                                window.location.href = 'login.html';
                            }, 1500);
                            
                        }).catch(error => {
                            console.log('Erro ao cadastrar usuário: ', error);

                            btnCadastro.classList.remove('loading');
                            btnCadastro.textContent = 'Cadastrar';
                            btnCadastro.disabled = false;
                            
                            alert('Erro ao cadastrar usuário!')
                        })
                    }
                }).catch(error => {
                    console.log('Erro ao cadastrar usuário! tente com outro email: ', error);

                    btnCadastro.classList.remove('loading');
                    btnCadastro.textContent = 'Cadastrar';
                    btnCadastro.disabled = false;
                    
                    alert('Erro ao tentar realizar o cadastro. Tente novamente, com outro email!')
                });
        });

        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('nome-cadastro').focus();
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
        document.getElementById('btn-voltar').addEventListener('click', function() {
            window.location.href = 'index.html';
        });
        