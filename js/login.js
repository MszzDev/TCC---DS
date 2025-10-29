document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Limpa estilos de erro anteriores
    errorMessage.classList.remove('visible'); // Usa classe para mostrar/esconder
    usernameInput.classList.remove('input-error'); // Usa classe para borda vermelha
    passwordInput.classList.remove('input-error');

    // Verifica as credenciais
    if (username === 'C123' && password === '123') {
        // Redireciona para o dashboard do Coordenador (caminho relativo da raiz)
        window.location.href = 'telas/coordenador/dashboard.html';
    } else if (username === 'S123' && password === '123') {
        // Redireciona para o dashboard do Supervisor (caminho relativo da raiz)
        window.location.href = 'telas/supervisor/sup_dashboard.html';
    } else {
        // Exibe mensagem de erro e adiciona estilos de erro
        errorMessage.classList.add('visible');
        usernameInput.classList.add('input-error');
        passwordInput.classList.add('input-error');
    }
});