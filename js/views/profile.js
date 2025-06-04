/**
 * Visualização responsável pela página de perfil
 * @namespace VisualizacaoPerfil
 */
const VisualizacaoPerfil = {
    /**
     * Mostra a página de perfil
     */
    async mostrar() {
        const conteudo = document.getElementById('main-content');
        conteudo.innerHTML = `
            <div class="container profile-container">
                <div class="profile-info">
                    <form id="form-perfil">
                        <div class="form-group">
                            <input type="text" id="nome-usuario" class="form-control" placeholder="Nome de usuário" required>
                        </div>
                        <div class="form-group">
                            <input type="email" id="email" class="form-control" placeholder="Email" required>
                        </div>
                        <div id="mensagem-erro" class="message message-error" style="display: none;"></div>
                        <div id="mensagem-sucesso" class="message message-success" style="display: none;"></div>
                        <button type="submit" class="btn btn-primary">Atualizar Perfil</button>
                    </form>
                </div>
                <h2>Minhas Postagens</h2>
                <div id="lista-postagens"></div>
            </div>
        `;

        await this.carregarDadosPerfil();
        await this.carregarPostagensUsuario();
        this.configurarFormularioPerfil();
    },

    /**
     * Carrega os dados do perfil do usuário
     */
    async carregarDadosPerfil() {
        const resultado = await ControladorPerfil.gerenciarObterPerfil();
        if (resultado.sucesso) {
            console.log(resultado.dados.username)
            document.getElementById('nome-usuario').value = resultado.dados.username;
            document.getElementById('email').value = resultado.dados.email;
        } else {
            const mensagemErro = document.getElementById('mensagem-erro');
            mensagemErro.textContent = resultado.erro;
            mensagemErro.style.display = 'block';
        }
    },

    /**
     * Configura os eventos do formulário de perfil
     */
    configurarFormularioPerfil() {
        const formulario = document.getElementById('form-perfil');
        
        formulario.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const dadosUsuario = {
                nomeUsuario: document.getElementById('nome-usuario').value,
                email: document.getElementById('email').value
            };

            const mensagemErro = document.getElementById('mensagem-erro');
            const mensagemSucesso = document.getElementById('mensagem-sucesso');
            
            const resultado = await ControladorPerfil.gerenciarAtualizarPerfil(dadosUsuario);
            
            if (resultado.sucesso) {
                mensagemErro.style.display = 'none';
                mensagemSucesso.textContent = 'Perfil atualizado com sucesso!';
                mensagemSucesso.style.display = 'block';
            } else {
                mensagemSucesso.style.display = 'none';
                mensagemErro.textContent = resultado.erro;
                mensagemErro.style.display = 'block';
            }
        });
    },

    /**
     * Carrega as postagens do usuário
     */
    async carregarPostagensUsuario() {
        const resultado = await ControladorPerfil.gerenciarObterPostagensUsuario();
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
        const dataFormatada = Postagens.formatarData(postagem.createdAt);
        return `
            <div class="post-item" data-id="${postagem._id}">
                <div class="post-header">
                    <span class="post-username">${postagem.author.username}</span>
                    <span class="post-date">${dataFormatada}</span>
                </div>
                <div class="post-content">${postagem.content}</div>
                <div class="post-actions">
                    <button class="btn-excluir" data-id="${postagem._id}">Excluir</button>
                </div>
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
                    await this.carregarPostagensUsuario();
                } else {
                    alert(resultado.erro);
                }
            });
        });
    }
}; 