/**
 * Controlador responsável pelas operações de postagens
 * @namespace ControladorPostagens
 */
const ControladorPostagens = {
    /**
     * Gerencia a criação de uma nova postagem
     * @param {string} conteudo - Conteúdo da postagem
     * @returns {Promise<Object>} Resultado da operação
     */
    async gerenciarCriarPostagem(conteudo) {
        try {
            const postagem = await Postagens.criar(conteudo);
            return {
                sucesso: true,
                dados: postagem
            };
        } catch (erro) {
            return {
                sucesso: false,
                erro: erro.message || 'Erro ao criar postagem'
            };
        }
    },

    /**
     * Gerencia a obtenção de todas as postagens
     * @returns {Promise<Object>} Resultado da operação
     */
    async gerenciarObterTodasPostagens() {
        try {
            const postagens = await Postagens.obterTodas();
            return {
                sucesso: true,
                dados: postagens
            };
        } catch (erro) {
            return {
                sucesso: false,
                erro: erro.message || 'Erro ao carregar postagens'
            };
        }
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
                erro: erro.message || 'Erro ao carregar suas postagens'
            };
        }
    },

    /**
     * Gerencia a exclusão de uma postagem
     * @param {string} idPostagem - ID da postagem a ser excluída
     * @returns {Promise<Object>} Resultado da operação
     */
    async gerenciarDeletarPostagem(idPostagem) {
        try {
            await Postagens.deletar(idPostagem);
            return { sucesso: true };
        } catch (erro) {
            return {
                sucesso: false,
                erro: erro.message || 'Erro ao deletar postagem'
            };
        }
    },

    /**
     * Valida o conteúdo de uma postagem
     * @param {string} conteudo - Conteúdo a ser validado
     * @returns {Object} Resultado da validação
     */
    validarConteudoPostagem(conteudo) {
        if (!conteudo || conteudo.trim().length === 0) {
            return {
                valido: false,
                erro: 'O conteúdo da postagem não pode estar vazio'
            };
        }

        if (conteudo.length > 280) {
            return {
                valido: false,
                erro: 'A postagem não pode ter mais de 280 caracteres'
            };
        }

        return { valido: true };
    }
}; 