document.addEventListener("DOMContentLoaded", function() {
    const content = document.getElementById('content');

    const pageContent = `
        <header>
            <h1>W.D.A.T. - Wild Ducks Airsoft Team</h1>
            <p>Bem-vindo à página oficial da nossa equipe de Airsoft</p>
        </header>

        <section id="about">
            <h2>Sobre Nós</h2>
            <p>A Wild Ducks Airsoft Team é uma equipa dedicada ao desporto e ao espírito de camaradagem, fundada em 2010.</p>
        </section>

        <section id="members">
            <h2>Membros da Equipe</h2>
            <ul>
                <li>Membro 1 - Capitão</li>
                <li>Membro 2 - Sniper</li>
                <li>Membro 3 - Assault</li>
                <li>Membro 4 - Support</li>
            </ul>
        </section>

        <section id="events">
            <h2>Eventos</h2>
            <p>Participamos de diversos eventos nacionais e internacionais.</p>
        </section>

        <section id="contact">
            <h2>Contato</h2>
            <p>Email: wildducks@airsoft.com</p>
        </section>
    `;

    content.innerHTML = pageContent;
});
