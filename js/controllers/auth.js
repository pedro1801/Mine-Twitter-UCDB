/**
 * Controlador responsável pelas operações de autenticação
 * @namespace ControladorAutenticacao
 */
const ControladorAutenticacao = {
    /**
     * Gerencia o processo de login
     * @param {string} email - Email do usuário
     * @param {string} senha - Senha do usuário
     * @returns {Promise<Object>} Resultado da operação
     */
    async gerenciarLogin(email, senha) {
        try {
            await Autenticacao.entrar(email, senha);
            return { sucesso: true };
        } catch (erro) {
            return {
                sucesso: false,
                erro: erro.message || 'Erro ao fazer login'
            };
        }
    },

    /**
     * Gerencia o processo de registro
     * @param {string} nomeUsuario - Nome do usuário
     * @param {string} email - Email do usuário
     * @param {string} senha - Senha do usuário
     * @returns {Promise<Object>} Resultado da operação
     */
    async gerenciarRegistro(nomeUsuario, email, senha) {
        try {
            await Autenticacao.registrar(nomeUsuario, email, senha);
            return { sucesso: true };
        } catch (erro) {
            return {
                sucesso: false,
                erro: erro.message || 'Erro ao registrar usuário'
            };
        }
    },

    /**
     * Gerencia o processo de logout
     */
    gerenciarLogout() {
        Autenticacao.sair();
    },

    /**
     * Gerencia a atualização do perfil
     * @param {Object} dadosUsuario - Novos dados do usuário
     * @returns {Promise<Object>} Resultado da operação
     */
    async gerenciarAtualizacaoPerfil(dadosUsuario) {
        try {
            await Autenticacao.atualizarPerfil(dadosUsuario);
            return { sucesso: true };
        } catch (erro) {
            return {
                sucesso: false,
                erro: erro.message || 'Erro ao atualizar perfil'
            };
        }
    },

    /**
     * Gerencia a obtenção do perfil
     * @returns {Promise<Object>} Resultado da operação
     */
    async gerenciarObterPerfil() {
        try {
            const perfil = await Autenticacao.obterPerfil();
            return {
                sucesso: true,
                dados: perfil
            };
        } catch (erro) {
            return {
                sucesso: false,
                erro: erro.message || 'Erro ao carregar perfil'
            };
        }
    }
}; 