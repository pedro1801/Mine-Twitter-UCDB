/**
 * Visualização responsável pelas páginas de autenticação
 * @namespace VisualizacaoAutenticacao
 */
const VisualizacaoAutenticacao = {
    /**
     * Mostra a página de login
     */
    mostrarLogin() {
        const conteudo = document.getElementById('main-content');
        conteudo.innerHTML = `
            <div class="auth-container">
                <form id="login-form" class="auth-form">
                    <div class="form-group">
                        <input type="email" id="email" class="form-control" placeholder="Email" required>
                    </div>
                    <div class="form-group">
                        <input type="password" id="senha" class="form-control" placeholder="Senha" required>
                    </div>
                    <div id="mensagem-erro" class="message message-error" style="display: none;"></div>
                    <button type="submit" class="btn btn-primary">Entrar</button>
                    <p class="text-center">
                        Não tem uma conta? <a href="#register">Registre-se</a>
                    </p>
                </form>
            </div>
        `;

        document.getElementById('login-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            const mensagemErro = document.getElementById('mensagem-erro');

            const resultado = await ControladorAutenticacao.gerenciarLogin(email, senha);
            if (resultado.sucesso) {
                window.location.hash = '#home';
            } else {
                mensagemErro.textContent = resultado.erro;
                mensagemErro.style.display = 'block';
            }
        });
    },

    /**
     * Mostra a página de registro
     */
    mostrarRegistro() {
        const conteudo = document.getElementById('main-content');
        conteudo.innerHTML = `
            <div class="auth-container">
                <form id="registro-form" class="auth-form">
                    <div class="form-group">
                        <input type="text" id="nome-usuario" class="form-control" placeholder="Nome de usuário" required>
                    </div>
                    <div class="form-group">
                        <input type="email" id="email" class="form-control" placeholder="Email" required>
                    </div>
                    <div class="form-group">
                        <input type="password" id="senha" class="form-control" placeholder="Senha" required>
                    </div>
                    <div id="mensagem-erro" class="message message-error" style="display: none;"></div>
                    <button type="submit" class="btn btn-primary">Registrar</button>
                    <p class="text-center">
                        Já tem uma conta? <a href="#login">Entre</a>
                    </p>
                </form>
            </div>
        `;

        document.getElementById('registro-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const nomeUsuario = document.getElementById('nome-usuario').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            const mensagemErro = document.getElementById('mensagem-erro');

            const resultado = await ControladorAutenticacao.gerenciarRegistro(nomeUsuario, email, senha);
            if (resultado.sucesso) {
                window.location.hash = '#home';
            } else {
                mensagemErro.textContent = resultado.erro;
                mensagemErro.style.display = 'block';
            }
        });
    }
}; 