document.getElementById('scoreForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Obtém os valores dos campos do formulário
    const player1Name = document.getElementById('player1Name').value;
    const player2Name = document.getElementById('player2Name').value;
    const player1Score = document.getElementById('player1Score').value;
    const player2Score = document.getElementById('player2Score').value;

    // Cria a mensagem de resultado
    const resultMessage = `
        <h4>Resultados:</h4>
        <p><strong>Jogador 1:</strong> ${player1Name} - <strong>Pontuação:</strong> ${player1Score}</p>
        <p><strong>Jogador 2:</strong> ${player2Name} - <strong>Pontuação:</strong> ${player2Score}</p>
    `;

    // Exibe a mensagem de resultado
    document.getElementById('result').innerHTML = resultMessage;
});
