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
                <td>${player1Name}</td>
                <td>${player1Score}</td>
                <td>${player2Score}</td>
                <td>${player2Name}</td>
                <td>${new Date(data.timestamp.seconds * 1000).toLocaleString()}</td>
            `;
            game1x1Results.append(row);
        });

        // Inicializa a DataTable após os dados serem carregados
        $('#game-1x1-table').DataTable();
    } catch (error) {
        console.error('Erro ao carregar Lista de Jogos: ', error);
    }
}



// Função para adicionar um novo jogo
async function addGame(player1Name, player1Score, player2Name, player2Score) {
    try {
        await db.collection('game-1x1-results').add({
            player1Name: player1Name,
            player1Score: player1Score,
            player2Name: player2Name,
            player2Score: player2Score
        });
        console.log('Jogo adicionado com sucesso');
        loadPlayersTable();
    } catch (error) {
        console.error('Erro ao adicionar Jogo: ', error);
    }
}



// Função para lidar com o envio do formulário de adicionar jogo
function handleAddGameFormSubmit(event) {
    event.preventDefault();
    const player1Name = document.getElementById('player1Name').value;
    const player1Score = parseInt(document.getElementById('player1Score').value);
    const player2Name = document.getElementById('player2Name').value;
    const player2Score = parseInt(document.getElementById('player2Score').value);

    if (player1Name && player2Name && !isNaN(player1Score) && !isNaN(player2Score)) {
        addGame(player1Name, player1Score, player2Name, player2Score).then(() => {
            document.getElementById('add-game-form').reset();
            $('#addGameModal').modal('hide');
        }).catch(error => {
            console.error('Erro ao adicionar Jogo: ', error);
        });
    }
}







// Inicializa a página
document.addEventListener('DOMContentLoaded', () => {
    loadPlayersTable();
    document.getElementById('add-game-form').addEventListener('submit', handleAddGameFormSubmit);
});
