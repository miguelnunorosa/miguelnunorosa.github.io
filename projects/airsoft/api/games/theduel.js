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
        const game1x1Results = document.getElementById('game-1x1-table-body');
        game1x1Results.innerHTML = ''; // Limpar a tabela antes de adicionar novos dados

        const snapshot = await db.collection('game-1x1-results').get();
        snapshot.forEach(doc => {
            const data = doc.data();
            const player1Name = data.player1Name;
            const player1Score = data.player1Score;
            const player2Name = data.player2Name;
            const player2Score = data.player2Score; 

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data.player1Name}</td>
                <td>${data.player1Score}</td>
                <td>${data.player2Name}</td>
                <td>${data.player2Score}</td>
                <td>${new Date(data.timestamp.seconds * 1000).toLocaleString()}</td>
            `;
            game1x1Results.append(row);
        });

        // Inicializa a DataTable após os dados serem carregados
        $('#players-table').DataTable();
    } catch (error) {
        console.error('Erro ao carregar Lista de Jogadores: ', error);
    }
}



// Inicializa a página
document.addEventListener('DOMContentLoaded', () => {
    loadPlayersTable();
});