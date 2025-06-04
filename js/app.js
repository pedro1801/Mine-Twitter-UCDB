/**
 * Objeto principal da aplicação
 * @namespace Aplicacao
 */
const Aplicacao = {
    /**
     * Inicializa a aplicação
     */
    inicializar() {
        this.configurarRotas();
        window.addEventListener('hashchange', () => this.gerenciarRota());
        this.gerenciarRota();
    },

    /**
     * Configura as rotas da aplicação
     */
    configurarRotas() {
        this.rotas = {
            '': () => this.redirecionarParaRotaPadrao(),
            '#login': () => this.mostrarPaginaLogin(),
            '#register': () => this.mostrarPaginaRegistro(),
            '#home': () => this.mostrarPaginaInicial(),
            '#profile': () => this.mostrarPaginaPerfil()
        };
    },

    /**
     * Redireciona para a rota padrão baseado no estado de autenticação
     */
    redirecionarParaRotaPadrao() {
        window.location.hash = Autenticacao.estaAutenticado() ? '#home' : '#login';
    },

    /**
     * Gerencia a mudança de rotas
     */
    async gerenciarRota() {
        const hash = window.location.hash || '';
        const rota = this.rotas[hash];

        if (rota) {
            if (hash !== '#login' && hash !== '#register' && !Autenticacao.estaAutenticado()) {
                window.location.hash = '#login';
                return;
            }

            if ((hash === '#login' || hash === '#register') && Autenticacao.estaAutenticado()) {
                window.location.hash = '#home';
                return;
            }

            // Adiciona ou remove a classe auth-page do body
            document.body.classList.toggle('auth-page', 
                hash === '#login' || hash === '#register');

            this.atualizarMenuNavegacao(hash);
            rota();
        } else {
            this.redirecionarParaRotaPadrao();
        }
    },

    /**
     * Atualiza o menu de navegação baseado na rota atual
     * @param {string} rotaAtual - Hash da rota atual
     */
    atualizarMenuNavegacao(rotaAtual) {
        const nav = document.getElementById('nav-menu');
        if (Autenticacao.estaAutenticado() && rotaAtual == '#profile')
        {
            nav.innerHTML = `
                <a href="#home">Voltar</a>
                <a href="#" id="logout-link">Sair</a>
            `;

            document.getElementById('logout-link').addEventListener('click', (e) => {
                e.preventDefault();
                Autenticacao.sair();
            });
        }
        else if (Autenticacao.estaAutenticado() && rotaAtual !== '#login' && rotaAtual !== '#register') {
            nav.innerHTML = `
                <a href="#profile">Perfil</a>
                <a href="#" id="logout-link">Sair</a>
            `;

            document.getElementById('logout-link').addEventListener('click', (e) => {
                e.preventDefault();
                Autenticacao.sair();
            });
        } else {
            nav.innerHTML = ''; // Remove o menu de navegação quando não estiver autenticado
        }
    },

    /**
     * Mostra a página de login
     */
    mostrarPaginaLogin() {
        VisualizacaoAutenticacao.mostrarLogin();
    },

    /**
     * Mostra a página de registro
     */
    mostrarPaginaRegistro() {
        VisualizacaoAutenticacao.mostrarRegistro();
    },

    /**
     * Mostra a página inicial
     */
    async mostrarPaginaInicial() {
        await VisualizacaoInicial.mostrar();
    },

    /**
     * Mostra a página de perfil
     */
    async mostrarPaginaPerfil() {
        await VisualizacaoPerfil.mostrar();
    }
};

// Inicializa a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => Aplicacao.inicializar());
