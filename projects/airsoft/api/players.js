// Configuração do Firebase
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_AUTH_DOMAIN",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_STORAGE_BUCKET",
    messagingSenderId: "SEU_MESSAGING_SENDER_ID",
    appId: "SEU_APP_ID",
    measurementId: "SEU_MEASUREMENT_ID"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Função para buscar jogadores da coleção "players" e exibir na tabela
async function fetchAndDisplayPlayers() {
    try {
        const playersTableBody = document.getElementById('players-table-body');
        playersTableBody.innerHTML = ''; // Limpar a tabela antes de adicionar novos dados

        const snapshot = await db.collection('players').get();
        snapshot.forEach(doc => {
            const playerData = doc.data();
            const playerName = playerData.playerName;
            const numberOfKills = playerData.numberOfKills || 0;
            const numberOfDeaths = playerData.numberOfDeaths || 0;
            const ratio = numberOfDeaths === 0 ? numberOfKills : (numberOfKills / numberOfDeaths).toFixed(2);

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${playerName}</td>
                <td>${numberOfKills}</td>
                <td>${numberOfDeaths}</td>
                <td>${ratio}</td>
            `;
            playersTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao buscar jogadores: ', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayPlayers);
