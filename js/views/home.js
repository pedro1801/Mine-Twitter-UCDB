/**
 * Visualização responsável pela página inicial
 * @namespace VisualizacaoInicial
 */
const VisualizacaoInicial = {
    /**
     * Mostra a página inicial
     */
    async mostrar() {
        const conteudo = document.getElementById('main-content');
        conteudo.innerHTML = `
            <div class="container">
                <form id="form-postagem" class="post-form">
                    <textarea id="conteudo-postagem" class="post-textarea" 
                        placeholder="O que está acontecendo?" maxlength="280"></textarea>
                    <div id="mensagem-erro" class="message message-error" style="display: none;"></div>
                    <button type="submit" class="btn btn-primary">Postar</button>
                </form>
                <div id="lista-postagens"></div>
            </div>
        `;

        this.configurarFormularioPostagem();
        await this.carregarPostagens();
    },

    /**
     * Configura os eventos do formulário de postagem
     */
    configurarFormularioPostagem() {
        const formulario = document.getElementById('form-postagem');
        const mensagemErro = document.getElementById('mensagem-erro');

        formulario.addEventListener('submit', async (e) => {
            e.preventDefault();
            const conteudo = document.getElementById('conteudo-postagem').value;

            const validacao = ControladorPostagens.validarConteudoPostagem(conteudo);
            if (!validacao.valido) {
                mensagemErro.textContent = validacao.erro;
                mensagemErro.style.display = 'block';
                return;
            }

            const resultado = await ControladorPostagens.gerenciarCriarPostagem(conteudo);
            if (resultado.sucesso) {
                document.getElementById('conteudo-postagem').value = '';
                mensagemErro.style.display = 'none';
                await this.carregarPostagens();
            } else {
                mensagemErro.textContent = resultado.erro;
                mensagemErro.style.display = 'block';
            }
        });
    },

    /**
     * Carrega e exibe as postagens
     */
    async carregarPostagens() {
        const resultado = await ControladorPostagens.gerenciarObterTodasPostagens();
        const containerPostagens = document.getElementById('lista-postagens');

        if (resultado.sucesso) {
            containerPostagens.innerHTML = resultado.dados
                .map(postagem => this.criarHtmlPostagem(postagem))
                .join('');

            this.configurarBotoesExcluir();
        } else {
            containerPostagens.innerHTML = `
                <div class="message message-error">
                    ${resultado.erro}
                </div>
            `;
        }
    },

    /**
     * Cria o HTML para uma postagem
     * @param {Object} postagem - Dados da postagem
     * @returns {string} HTML da postagem
     */
    criarHtmlPostagem(postagem) {
        const usuarioAtual = Autenticacao.obterUsuario();
        const podeExcluir = usuarioAtual && usuarioAtual.id === postagem.userId;
        const dataFormatada = Postagens.formatarData(postagem.createdAt);
        return `
            <div class="post-item" data-id="${postagem._id}">
                <div class="post-header">
                    <span class="post-username">${postagem.author.username}</span>
                    <span class="post-date">${dataFormatada}</span>
                </div>
                <div class="post-content">${postagem.content}</div>
                ${podeExcluir ? `
                    <div class="post-actions">
                        <button class="btn-excluir" data-id="${postagem.id}">Excluir</button>
                    </div>
                ` : ''}
            </div>
        `;
    },

    /**
     * Configura os eventos dos botões de excluir postagem
     */
    configurarBotoesExcluir() {
        document.querySelectorAll('.btn-excluir').forEach(botao => {
            botao.addEventListener('click', async () => {
                const idPostagem = botao.dataset.id;
                const resultado = await ControladorPostagens.gerenciarDeletarPostagem(idPostagem);
                
                if (resultado.sucesso) {
                    await this.carregarPostagens();
                } else {
                    alert(resultado.erro);
                }
            });
        });
    }
}; 