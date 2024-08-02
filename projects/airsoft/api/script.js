// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDLbaamQzgAA6RNCTvyU8lM-432CN6CxFs",
    authDomain: "airsoft-games-565ce.firebaseapp.com",
    projectId: "airsoft-games-565ce",
    storageBucket: "airsoft-games-565ce.appspot.com",
    messagingSenderId: "553707912710",
    appId: "1:553707912710:web:d99165bac1d59bc7f7cd87",
    measurementId: "G-MTBQ2E1F04"
};


// Inicializa o Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

// Função para registrar os resultados
document.getElementById('results-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const player1Name = document.getElementById('player1-name').value;
    const player1Score = document.getElementById('player1-score').value;
    const player2Name = document.getElementById('player2-name').value;
    const player2Score = document.getElementById('player2-score').value;

    try {
        await db.collection('game-1x1-results').add({
            player1Name: player1Name,
            player1Score: player1Score,
            player2Name: player2Name,
            player2Score: player2Score,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert('Resultado registrado com sucesso!');
        document.getElementById('results-form').reset();
    } catch (error) {
        console.error('Erro ao registrar o resultado: ', error);
        alert('Erro ao registrar o resultado.');
    }
});
