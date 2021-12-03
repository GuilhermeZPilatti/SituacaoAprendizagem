class Menu extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <nav>
            <div class="nav-wrapper">
                <a href="/" class="brand-logo center">Logo</a>
                <ul id="nav-mobile" class="left hide-on-med-and-down">
                    <li><a href="/index.html">Início</a></li>
                    <li><a href="/salas/relatorio_salas.html">Salas</a></li>
                    <li><a href="/reserva/cadastro_reserva.html">Reservar sala</a></li>
                    <li><a href="/Alunos/relatorio_alunos.html">Alunos</a></li>
                    <li><a href="/Professores/relatorio_professores.html">Professores</a></li>
                </ul>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><a href="/login.html">Entre</a></li>
                    <li><a href="/Alunos/cadastro_alunos.html">Cadastre-se (Alunos)</a></li>
                    <li><a href="/Professores/cadastro_professores.html">Cadastre-se (Professores)</a></li>
                </ul>
            </div>
        </nav>
        `;
    }
}

customElements.define('componente-menu', Menu);