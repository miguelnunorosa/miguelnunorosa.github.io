// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCyj-d_dhgMXHqK0BtneCAask84igu34",
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
        if ($.fn.DataTable.isDataTable('#game-1x1-table')) {
            console.log('Destruindo DataTable existente...');
            $('#game-1x1-table').DataTable().destroy();
        }

        // Inicializa a DataTable após os dados serem carregados
        setTimeout(() => {
            console.log('Inicializando DataTable...');
            $('#game-1x1-table').DataTable();
        }, 100); // Atraso de 100ms

        console.log('Resultados dos jogos carregados com sucesso.');
    } catch (error) {
        console.error('Erro ao carregar Lista de Jogos: ', error);
    }
}

// Função para buscar jogadores da coleção "players"
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
    
    const player1Select = document.getElementById('player1Name');
    const player2Select = document.getElementById('player2Name');

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
        if (option.value === selectedValue) {
            option.disabled = true;
        } else {
            option.disabled = false;
        }
    });
}

// Função para adicionar um novo resultado
async function addResult(player1Name, player1Score, player2Name, player2Score) {
    try {
        await db.collection('game-1x1-results').add({
            player1Name: player1Name,
            player1Score: player1Score,
            player2Name: player2Name,
            player2Score: player2Score,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('Resultado adicionado com sucesso');

        // Atualizar estatísticas dos jogadores
        await updatePlayerStats(player1Name, player1Score, player2Score);
        await updatePlayerStats(player2Name, player2Score, player1Score);

        // Atualizar os resultados após a inserção
        console.log('Carregando os resultados após a inserção...');
        await loadGameResults();
    } catch (error) {
        console.error('Erro ao adicionar Resultado: ', error);
    }
}

// Função para atualizar estatísticas dos jogadores
async function updatePlayerStats(playerName, kills, deaths) {
    const playerRef = db.collection('players').where('playerName', '==', playerName);
    const snapshot = await playerRef.get();

    if (snapshot.empty) {
        console.error('Jogador não encontrado:', playerName);
        return;
    }

    const doc = snapshot.docs[0];
    const playerId = doc.id;

    // Usar let em vez de const aqui
    let updatedKills = (doc.data().numberOfKills || 0) + kills;
    let updatedDeaths = (doc.data().numberOfDeaths || 0) + deaths;

    await db.collection('players').doc(playerId).update({
        numberOfKills: updatedKills,
        numberOfDeaths: updatedDeaths
    });
}

// Função para lidar com o envio do formulário de adicionar resultado
async function handleAddResultFormSubmit(event) {
    event.preventDefault();
    console.log('Enviando formulário para adicionar resultado...');

    const player1Name = document.getElementById('player1Name').value;
    const player1Score = parseInt(document.getElementById('player1Score').value);
    const player2Name = document.getElementById('player2Name').value;
    const player2Score = parseInt(document.getElementById('player2Score').value);

    try {
        if (player1Name && player2Name && !isNaN(player1Score) && !isNaN(player2Score)) {
            await addResult(player1Name, player1Score, player2Name, player2Score);

            console.log('Fechando o modal após a atualização da tabela...');
            $('#addGameModal').modal('hide');
            
            // Resetar o formulário
            document.getElementById('add-game-form').reset();
            console.log('Formulário enviado e modal fechado.');
        } else {
            console.error('Erro ao adicionar Resultado: Verifique os dados inseridos.');
        }
    } catch (error) {
        console.error('Erro ao adicionar resultados: ', error);
    }
}

// Inicializa a página
document.addEventListener('DOMContentLoaded', () => {
    loadGameResults();
    document.getElementById('add-game-form').addEventListener('submit', handleAddResultFormSubmit);
});
