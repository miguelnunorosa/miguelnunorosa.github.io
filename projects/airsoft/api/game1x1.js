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

// Função para buscar jogadores da coleção "players" e preencher os dropdowns
async function fetchPlayers() {
    const player1Select = document.getElementById('player1');
    const player2Select = document.getElementById('player2');

    const snapshot = await db.collection('players').get();
    snapshot.forEach(doc => {
        const playerData = doc.data();
        const option1 = document.createElement('option');
        option1.value = doc.id;
        option1.textContent = playerData.playerName;
        player1Select.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = doc.id;
        option2.textContent = playerData.playerName;
        player2Select.appendChild(option2);
    });

    // Desabilitar a seleção do mesmo jogador nos dois dropdowns
    player1Select.addEventListener('change', () => {
        for (const option of player2Select.options) {
            option.disabled = option.value === player1Select.value;
        }
    });

    player2Select.addEventListener('change', () => {
        for (const option of player1Select.options) {
            option.disabled = option.value === player2Select.value;
        }
    });
}

// Função para incrementar pontuações
async function submitResults(event) {
    event.preventDefault();

    const player1Id = document.getElementById('player1').value;
    const player1Score = parseInt(document.getElementById('player1Score').value, 10);
    const player2Id = document.getElementById('player2').value;
    const player2Score = parseInt(document.getElementById('player2Score').value, 10);

    const player1Ref = db.collection('players').doc(player1Id);
    const player2Ref = db.collection('players').doc(player2Id);

    await db.runTransaction(async (transaction) => {
        const player1Doc = await transaction.get(player1Ref);
        const player2Doc = await transaction.get(player2Ref);

        if (!player1Doc.exists || !player2Doc.exists) {
            throw "Player document does not exist!";
        }

        const player1Data = player1Doc.data();
        const player2Data = player2Doc.data();

        transaction.update(player1Ref, {
            numberOfKills: (player1Data.numberOfKills || 0) + player1Score,
            numberOfDeaths: (player1Data.numberOfDeaths || 0) + player2Score
        });

        transaction.update(player2Ref, {
            numberOfKills: (player2Data.numberOfKills || 0) + player2Score,
            numberOfDeaths: (player2Data.numberOfDeaths || 0) + player1Score
        });
    });

    document.getElementById('game-form').reset();
    alert('Resultado registrado com sucesso!');
}

document.addEventListener('DOMContentLoaded', () => {
    fetchPlayers();
    document.getElementById('game-form').addEventListener('submit', submitResults);
});
