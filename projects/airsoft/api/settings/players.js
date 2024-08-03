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




// Função para carregar Lista Jogadores
async function loadPlayersTable() {
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
            playersTableBody.append(row);
        });

        // Inicializa a DataTable
        $('#players-table').DataTable();
    } catch (error) {
        console.error('Erro ao carregar Lista de Jogadores: ', error);
    }
}










// Inicializa a página
document.addEventListener('DOMContentLoaded', () => {
    loadPlayersTable();
});
