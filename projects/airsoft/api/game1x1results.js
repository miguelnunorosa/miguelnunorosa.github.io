// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCyj-d_dhgMXHqKkG0BtneCAask84igu34",
    authDomain: "airsoft-gamemaster-tool.firebaseapp.com",
    projectId: "airsoft-gamemaster-tool",
    storageBucket: "airsoft-gamemaster-tool.appspot.com",
    messagingSenderId: "651326007639",
    appId: "1:651326007639:web:50975fdc4e337c7a5d7612",
    measurementId: "G-F8F1DBRS6S"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Função para registrar o resultado do jogo
async function registerResult(player1, player1Kills, player1Deaths, player2, player2Kills, player2Deaths) {
    try {
        await db.collection('results').add({
            player1: player1,
            player1Kills: player1Kills,
            player1Deaths: player1Deaths,
            player2: player2,
            player2Kills: player2Kills,
            player2Deaths: player2Deaths
        });
        console.log('Resultado registrado com sucesso');
    } catch (error) {
        console.error('Erro ao registrar resultado: ', error);
    }
}

// Função para buscar resultados e exibir na tabela
async function fetchAndDisplayResults() {
    try {
        const resultsTableBody = document.getElementById('results-table-body');
        resultsTableBody.innerHTML = ''; // Limpar a tabela antes de adicionar novos dados

        const snapshot = await db.collection('results').get();
        snapshot.forEach(doc => {
            const resultData = doc.data();

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${resultData.player1}</td>
                <td>${resultData.player1Kills}</td>
                <td>${resultData.player1Deaths}</td>
                <td>${resultData.player2}</td>
                <td>${resultData.player2Kills}</td>
                <td>${resultData.player2Deaths}</td>
            `;
            resultsTableBody.appendChild(row);
        });

        // Inicializa a DataTable
        $('#results-table').DataTable();
    } catch (error) {
        console.error('Erro ao buscar resultados: ', error);
    }
}

// Função para preencher os dropdowns com os jogadores
async function populatePlayerDropdowns() {
    try {
        const playersSnapshot = await db.collection('players').get();
        const player1Dropdown = document.getElementById('player1');
        const player2Dropdown = document.getElementById('player2');

        playersSnapshot.forEach(doc => {
            const playerData = doc.data();
            const option1 = document.createElement('option');
            option1.value = playerData.name;
            option1.textContent = playerData.name;
            player1Dropdown.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = playerData.name;
            option2.textContent = playerData.name;
            player2Dropdown.appendChild(option2);
        });
    } catch (error) {
        console.error('Erro ao buscar jogadores: ', error);
    }
}

// Evento de envio do formulário
document.getElementById('result-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const player1 = document.getElementById('player1').value;
    const player1Kills = document.getElementById('player1-kills').value;
    const player1Deaths = document.getElementById('player1-deaths').value;
    const player2 = document.getElementById('player2').value;
    const player2Kills = document.getElementById('player2-kills').value;
    const player2Deaths = document.getElementById('player2-deaths').value;

    await registerResult(player1, player1Kills, player1Deaths, player2, player2Kills, player2Deaths);
    fetchAndDisplayResults(); // Atualiza a tabela com os novos resultados

    // Limpar o formulário após o registro
    document.getElementById('result-form').reset();
});

// Inicializa a página buscando resultados e jogadores
document.addEventListener('DOMContentLoaded', async () => {
    await populatePlayerDropdowns();
    fetchAndDisplayResults();
});
