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
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

// Função para registrar os resultados
// Função para registrar os resultados
document.getElementById('results-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const player1Name = document.getElementById('player1-name').value;
    const player1Score = parseInt(document.getElementById('player1-score').value);
    const player2Name = document.getElementById('player2-name').value;
    const player2Score = parseInt(document.getElementById('player2-score').value);

    console.log("Dados do formulário:", { player1Name, player1Score, player2Name, player2Score });

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

