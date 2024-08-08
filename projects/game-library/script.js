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