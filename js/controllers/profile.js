/**
 * Controlador responsável pelas operações do perfil do usuário
 * @namespace ControladorPerfil
 */
const ControladorPerfil = {
    /**
     * Gerencia a obtenção do perfil do usuário
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
    },

    /**
     * Gerencia a atualização do perfil do usuário
     * @param {Object} dadosUsuario - Novos dados do usuário
     * @returns {Promise<Object>} Resultado da operação
     */
    async gerenciarAtualizarPerfil(dadosUsuario) {
        const validacao = this.validarDadosPerfil(dadosUsuario);
        if (!validacao.valido) {
            return {
                sucesso: false,
                erro: validacao.erro
            };
        }

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
     * Valida os dados do perfil
     * @param {Object} dadosUsuario - Dados a serem validados
     * @returns {Object} Resultado da validação
     */
    validarDadosPerfil(dadosUsuario) {
        const { nomeUsuario, email } = dadosUsuario;

        if (!nomeUsuario || nomeUsuario.trim().length === 0) {
            return {
                valido: false,
                erro: 'O nome de usuário não pode estar vazio'
            };
        }

        if (nomeUsuario.length < 3) {
            return {
                valido: false,
                erro: 'O nome de usuário deve ter pelo menos 3 caracteres'
            };
        }

        if (!email || email.trim().length === 0) {
            return {
                valido: false,
                erro: 'O email não pode estar vazio'
            };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                valido: false,
                erro: 'Email inválido'
            };
        }

        return { valido: true };
    },

    /**
     * Gerencia a obtenção das postagens do usuário
     * @returns {Promise<Object>} Resultado da operação
     */
    async gerenciarObterPostagensUsuario() {
        try {
            const postagens = await Postagens.obterDoUsuario();
            return {
                sucesso: true,
                dados: postagens
            };
        } catch (erro) {
            return {
                sucesso: false,
                erro: erro.message || 'Erro ao carregar postagens do usuário'
            };
        }
    }
}; 