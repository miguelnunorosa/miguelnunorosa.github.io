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




// Função para carregar resultados na tabela
async function loadResults() {
    const tableBody = document.querySelector('#results-table tbody');
    tableBody.innerHTML = ''; // Limpar tabela existente

    try {
        const snapshot = await db.collection('game-1x1-results').orderBy('timestamp', 'desc').get();
        snapshot.forEach(doc => {
            const data = doc.data();
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${data.player1Name}</td>
                <td>${data.player1Score}</td>
                <td>${data.player2Name}</td>
                <td>${data.player2Score}</td>
                <td>${new Date(data.timestamp.seconds * 1000).toLocaleString()}</td>
            `;
            
            tableBody.appendChild(row);
        });

        // Inicializar DataTable
        if ($.fn.DataTable.isDataTable('#results-table')) {
            $('#results-table').DataTable().destroy();
        }
        $('#results-table').DataTable({
            "paging": true,
            "searching": true,
            "ordering": true,
            "info": true
        });
    } catch (error) {
        console.error('Erro ao carregar resultados: ', error);
    }
}



// Inicializa a página
document.addEventListener('DOMContentLoaded', () => {
    loadResults(); // Carregar resultados na inicialização
});
