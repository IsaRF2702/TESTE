function logout() {
    // Limpar dados de autenticação do localStorage/sessionStorage (se estiver usando)
    localStorage.removeItem('token'); // ou 'user', 'auth', etc.
    sessionStorage.clear();
  
    // Redirecionar para a página de login
    window.location.href = "login.html"; // altere para o caminho correto
  }
  