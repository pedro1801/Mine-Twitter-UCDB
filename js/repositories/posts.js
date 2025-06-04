/**
 * Objeto responsável pelo gerenciamento de postagens
 * @namespace Postagens
 */
const Postagens = {
    /**
     * Cria uma nova postagem
     * @param {string} conteudo - Conteúdo da postagem
     * @returns {Promise<Object>} Dados da postagem criada
     */
    async criar(conteudo) {
        return await API.requisicao('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ content: conteudo })
        });
    },

    /**
     * Obtém todas as postagens
     * @returns {Promise<Array>} Lista de postagens
     */
    async obterTodas() {
        return await API.requisicao('/api/posts');
    },

    /**
     * Obtém as postagens do usuário atual
     * @returns {Promise<Array>} Lista de postagens do usuário
     */
    async obterDoUsuario() {
        return await API.requisicao('/api/posts/my-posts');
    },

    /**
     * Deleta uma postagem específica
     * @param {string} idPostagem - ID da postagem a ser deletada
     * @returns {Promise<Object>} Resultado da operação
     */
    async deletar(idPostagem) {
        return await API.requisicao(`/api/posts/${idPostagem}`, {
            method: 'DELETE'
        });
    },

    /**
     * Formata uma data para o formato brasileiro
     * @param {string} dataString - String da data a ser formatada
     * @returns {string} Data formatada
     */
    formatarData(dataString) {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}; 