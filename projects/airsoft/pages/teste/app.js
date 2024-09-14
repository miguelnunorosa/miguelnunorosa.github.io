document.addEventListener("DOMContentLoaded", function() {
    const content = document.getElementById('content');
    
    const pageContent = `
        <h1>Wild Ducks Airsoft Team</h1>
        <p>Bem-vindo ao site da equipe Wild Ducks Airsoft Team.</p>
        <h2>Nossa Equipe</h2>
        <ul>
            <li>Membro 1 - Líder</li>
            <li>Membro 2 - Sniper</li>
            <li>Membro 3 - Support</li>
        </ul>
        <h2>História</h2>
        <p>Desde 2010, somos uma equipe dedicada ao airsoft, participando de eventos nacionais e internacionais.</p>
    `;
    
    content.innerHTML = pageContent;
});
