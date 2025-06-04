/**
 * Objeto responsável pelo gerenciamento de autenticação
 * @namespace Autenticacao
 */
const Autenticacao = {
    /**
     * Registra um novo usuário
     * @param {string} nomeUsuario - Nome do usuário
     * @param {string} email - Email do usuário
     * @param {string} senha - Senha do usuário
     * @returns {Promise<Object>} Dados do usuário registrado
     */
    async registrar(nomeUsuario, email, senha) {
        const dados = await API.requisicao('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({ username: nomeUsuario, email, password: senha })
        });
        
        this.definirSessao(dados);
        return dados;
    },

    /**
     * Realiza o login do usuário
     * @param {string} email - Email do usuário
     * @param {string} senha - Senha do usuário
     * @returns {Promise<Object>} Dados do usuário logado
     */
    async entrar(email, senha) {
        const dados = await API.requisicao('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password: senha })
        });
        
        this.definirSessao(dados);
        return dados;
    },

    /**
     * Realiza o logout do usuário
     */
    sair() {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        window.location.hash = '#login';
    },

    /**
     * Define os dados da sessão do usuário
     * @param {Object} dados - Dados da sessão
     * @private
     */
    definirSessao(dados) {
        localStorage.setItem('token', dados.token);
        localStorage.setItem('usuario', JSON.stringify(dados.user));
    },

    /**
     * Obtém os dados do usuário atual
     * @returns {Object|null} Dados do usuário ou null se não estiver autenticado
     */
    obterUsuario() {
        const usuario = localStorage.getItem('usuario');
        return usuario ? JSON.parse(usuario) : null;
    },

    /**
     * Verifica se o usuário está autenticado
     * @returns {boolean} True se estiver autenticado, false caso contrário
     */
    estaAutenticado() {
        return !!localStorage.getItem('token');
    },

    /**
     * Atualiza o perfil do usuário
     * @param {Object} dadosUsuario - Novos dados do usuário
     * @returns {Promise<Object>} Dados atualizados do usuário
     */
    async atualizarPerfil(dadosUsuario) {
        const dados = await API.requisicao('/api/users/profile', {
            method: 'PUT',
            body: JSON.stringify({
                username: dadosUsuario.nomeUsuario,
                email: dadosUsuario.email
            })
        });
        
        const usuario = this.obterUsuario();
        const usuarioAtualizado = { ...usuario, ...dados.user };
        localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));
        
        return dados;
    },

    /**
     * Obtém o perfil do usuário atual
     * @returns {Promise<Object>} Dados do perfil do usuário
     */
    async obterPerfil() {
        return await API.requisicao('/api/users/profile');
    }
}; 