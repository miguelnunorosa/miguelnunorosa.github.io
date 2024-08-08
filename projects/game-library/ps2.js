// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDtHdqoOcgWw4JbTkJwWxotFb5ff_I72bg",
    authDomain: "projeto-game-library.firebaseapp.com",
    projectId: "projeto-game-library",
    storageBucket: "projeto-game-library.appspot.com",
    messagingSenderId: "282241782326",
    appId: "1:282241782326:web:471e1aa8d477c0368bbe97",
    measurementId: "G-9N6SHDZS0R"
  };

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


// Referência à coleção "playstation2"
var ps2Collection = db.collection("playstation2");

// Obter dados da coleção e preencher a tabela
ps2Collection.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // Para cada documento, obtenha os dados
        var data = doc.data();
        // Crie uma nova linha na tabela com os dados
        var newRow = `
            <tr>
                <td>${data.title}</td>
                <td>${data.isDigital}</td>
                <td>${data.isComplete}</td>
            </tr>
        `;
        // Adicione a nova linha ao corpo da tabela
        $('#example tbody').append(newRow);
    });
}).catch((error) => {
    console.error("Erro ao obter documentos: ", error);
});
