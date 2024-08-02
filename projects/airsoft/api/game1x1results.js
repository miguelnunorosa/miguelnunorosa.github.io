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


// Função para buscar jogadores da coleção "players" e exibir na tabela
async function fetchAndDisplayPlayers() {
    
    const playersTableBody = document.getElementById('game1x1results-table-body');
    playersTableBody.innerHTML = ''; // Limpar a tabela antes de adicionar novos dados
    
    try {
        const snapshot = await db.collection('game-1x1-results').orderBy('timestamp', 'desc').get();
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
                <td>${data.player2Score}</td>
                <td>${data.player2Name}</td>
                <td>${new Date(data.timestamp.seconds * 1000).toLocaleString()}</td>
            `;
            
            playersTableBody.appendChild(row);
        });

       // Inicializa a DataTable
       $('#results-table').DataTable();
    } catch (error) {
        console.error('Erro ao carregar resultados: ', error);
    }
    
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayPlayers);