/**
 * Objeto responsável pela comunicação com a API do Mini Twitter
 * @namespace API
 */
const API = {
    /** URL base da API */
    URL_BASE: 'https://mini-twitter-api-vy9q.onrender.com',
    
    /**
     * Realiza uma requisição para a API
     * @param {string} endpoint - Endpoint da API a ser acessado
     * @param {Object} opcoes - Opções da requisição
     * @returns {Promise<Object>} Resposta da API
     * @throws {Error} Erro na requisição
     */
    async requisicao(endpoint, opcoes = {}) {
        const token = localStorage.getItem('token');
        
        const opcoesDefault = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            }
        };

        try {
            const resposta = await fetch(`${this.URL_BASE}${endpoint}`, {
                ...opcoesDefault,
                ...opcoes,
                headers: {
                    ...opcoesDefault.headers,
                    ...opcoes.headers
                }
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.message || 'Erro na requisição');
            }

            return dados;
        } catch (erro) {
            console.error('Erro na API:', erro);
            throw erro;
        }
    }
}; 