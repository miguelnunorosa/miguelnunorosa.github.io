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


// Inicializando o Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();





// Função para carregar os resultados do Firebase
function loadResults() {
    db.collection("game1x1results").get().then((querySnapshot) => {
        const tableBody = document.querySelector("#resultsTable tbody");
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${data.player1Name}</td>
                <td>${data.player1Score}</td>
                <td>${data.player2Score}</td>
                <td>${data.player2Name}</td>
                <td>${data.timestamp}</td>
            `;
            tableBody.appendChild(row);
        });
        // Inicializando o DataTable
        $('#resultsTable').DataTable();
    }).catch((error) => {
        console.error("Erro ao carregar os resultados: ", error);
    });
}

// Carregando os resultados quando a página for carregada
window.onload = loadResults;
