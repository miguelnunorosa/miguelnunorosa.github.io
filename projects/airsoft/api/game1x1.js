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



// Função para buscar jogadores da coleção "players" e preencher os dropdowns
async function fetchPlayerNames() {
    const players = [];
    try {
        const snapshot = await db.collection('players').get();
        snapshot.forEach(doc => {
            players.push(doc.data().playerName);
        });
    } catch (error) {
        console.error('Erro ao buscar nomes de jogadores: ', error);
    }
    return players;
}



// Função para preencher os dropdowns
async function populateDropdowns() {
    const playerNames = await fetchPlayerNames();

    const player1Select = document.getElementById('player1');
    const player2Select = document.getElementById('player2');

    player1Select.innerHTML = '<option value="" disabled selected>Selecione um jogador</option>';
    player2Select.innerHTML = '<option value="" disabled selected>Selecione um jogador</option>';

    playerNames.forEach(name => {
        const option1 = document.createElement('option');
        option1.value = name;
        option1.textContent = name;
        player1Select.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = name;
        option2.textContent = name;
        player2Select.appendChild(option2);
    });

    player1Select.addEventListener('change', () => updateDropdowns(player1Select, player2Select));
    player2Select.addEventListener('change', () => updateDropdowns(player2Select, player1Select));
}



// Função para desativar jogador selecionado no outro dropdown
function updateDropdowns(changedSelect, otherSelect) {
    const selectedValue = changedSelect.value;

    Array.from(otherSelect.options).forEach(option => {
        option.disabled = option.value === selectedValue;
    });
}

document.addEventListener('DOMContentLoaded', populateDropdowns);



// Função para registrar os resultados
document.getElementById('game-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const player1Name = document.getElementById('player1').value;
    const player1Score = parseInt(document.getElementById('player1Score').value);
    const player2Name = document.getElementById('player2').value;
    const player2Score = parseInt(document.getElementById('player2Score').value);

    console.log("Dados do formulário:", { player1Name, player1Score, player2Name, player2Score });

    try {
        // Registrar resultado do jogo
        await db.collection('game-1x1-results').add({
            player1Name: player1Name,
            player1Score: player1Score,
            player2Name: player2Name,
            player2Score: player2Score,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Atualizar estatísticas dos jogadores
        await updatePlayerStats(player1Name, player1Score, player2Score);
        await updatePlayerStats(player2Name, player2Score, player1Score);

        alert('Resultado registrado com sucesso!');
        document.getElementById('game-form').reset();
        populateDropdowns(); // Recarregar dropdowns após registrar o resultado
    } catch (error) {
        console.error('Erro ao registrar o resultado: ', error);
        alert('Erro ao registrar o resultado.');
    }
});

// Função para incrementar pontuações
async function updatePlayerStats(playerName, kills, deaths) {
    const playerRef = db.collection('players').where("playerName", "==", playerName);
    const snapshot = await playerRef.get();

    if (snapshot.empty) {
        console.log('Nenhum jogador encontrado com o nome: ', playerName);
        return;
    }

    snapshot.forEach(async (doc) => {
        const playerData = doc.data();
        await db.collection('players').doc(doc.id).update({
            numberOfKills: (playerData.numberOfKills || 0) + kills,
