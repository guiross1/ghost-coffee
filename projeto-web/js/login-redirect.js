function obterUsuarioLogado(){
    const usuario = localStorage.getItem('usuarioLogado')
    return usuario ? JSON.parse(usuario) : null;
}

function verificarSeJaEstaLogado() {
    const usuarioLogado = obterUsuarioLogado();
    
    if (usuarioLogado) {
        window.location.href = "../index.html";
        return;
    }
}

document.addEventListener('DOMContentLoaded', verificarSeJaEstaLogado);

document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        verificarSeJaEstaLogado();
    }
});