// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCyj-d_dhgMXHqKkG0BtneCAask84igu34",
    authDomain: "airsoft-gamemaster-tool.firebaseapp.com",
    projectId: "airsoft-gamemaster-tool",
    storageBucket: "airsoft-gamemaster-tool",
    messagingSenderId: "651326007639",
    appId: "1:651326007639:web:50975fdc4e337c7a5d7612",
    measurementId: "G-F8F1DBRS6S"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let dataTable; // Declare a variable to store the DataTable instance

// Função para carregar Lista Jogadores
async function loadGameResults() {
    console.log('Carregando resultados dos jogos...');
    populateDropdowns();

    try {
        const game1x1Results = document.getElementById('game-1x1-table-body');
        game1x1Results.innerHTML = ''; // Limpar a tabela antes de adicionar novos dados

        const snapshot = await db.collection('game-1x1-results').orderBy('timestamp', 'desc').get();
        snapshot.forEach(doc => {
            const data = doc.data();
            const player1Name = data.player1Name;
            const player1Score = data.player1Score;
            const player2Name = data.player2Name;
            const player2Score = data.player2Score;
            const timestamp = data.timestamp ? new Date(data.timestamp.seconds * 1000).toLocaleString() : 'Data não disponível';

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${player1Name}</td>
                <td>${player1Score}</td>
                <td>${player2Score}</td>
                <td>${player2Name}</td>
                <td>${timestamp}</td>
            `;
            game1x1Results.append(row);
        });

        // Destruir a DataTable existente antes de reinicializá-la
        if (dataTable) {
            console.log('Destruindo DataTable existente...');
            dataTable.destroy();
        }

        // Inicializar a DataTable
        console.log('Inicializando DataTable...');
        dataTable = $('#game-1x1-table').DataTable();

        console.log('Resultados dos jogos carregados com sucesso.');
    } catch (error) {
        console.error('Erro ao carregar os resultados dos jogos:', error);
    }
}

// Função para carregar os jogadores
async function populateDropdowns() {
    try {
        const playersSnapshot = await db.collection('players').get();
        const player1NameSelect = document.getElementById('player1Name');
        const player2NameSelect = document.getElementById('player2Name');

        playersSnapshot.forEach(doc => {
            const playerName = doc.data().name;
            const option1 = document.createElement('option');
            option1.textContent = playerName;
            option1.value = playerName;
            player1NameSelect.append(option1);

            const option2 = document.createElement('option');
            option2.textContent = playerName;
            option2.value = playerName;
            player2NameSelect.append(option2);
        });
    } catch (error) {
        console.error('Erro ao carregar a lista de jogadores:', error);
    }
}

// Função para adicionar resultado de jogo
document.getElementById('add-game-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const player1Name = document.getElementById('player1Name').value;
    const player1Score = parseInt(document.getElementById('player1Score').value, 10);
    const player2Name = document.getElementById('player2Name').value;
    const player2Score = parseInt(document.getElementById('player2Score').value, 10);
    const timestamp = new Date();

    try {
        await db.collection('game-1x1-results').add({
            player1Name,
            player1Score,
            player2Name,
            player2Score,
            timestamp
        });

        console.log('Resultado adicionado com sucesso');
        loadGameResults();

        const addGameModal = document.getElementById('addGameModal');
        const modal = bootstrap.Modal.getInstance(addGameModal);
        modal.hide();
    } catch (error) {
        console.error('Erro ao adicionar resultado do jogo:', error);
    }
});

// Inicialização
window.addEventListener('DOMContentLoaded', loadGameResults);
