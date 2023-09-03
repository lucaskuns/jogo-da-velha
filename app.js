const gameBoard = document.querySelector("#gameboard")
const infoDisplay = document.querySelector("#info")
const startCells = [
     "", "", "", "", "", "", "", "", "",
]

let go = "bola"
infoDisplay.textContent = "Bola vai primeiro"
const restartButton = document.querySelector("#restartButton");

function restartGame() {
    startCells.fill(""); // Limpa o array de células
    go = "bola"; // Reinicia o jogador atual
    infoDisplay.textContent = "Bola vai primeiro"; // Reinicia o texto
    gameBoard.innerHTML = ""; // Limpa o tabuleiro

    creatBoard(); // Cria um novo tabuleiro
}


function creatBoard (){
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement ('div')
        cellElement.classList.add ('square')
        cellElement.id = index
        cellElement.addEventListener('click', addGo)
        gameBoard.append(cellElement)

    })
}

creatBoard()

function addGo (e){
    const goDisplay = document.createElement ('div')
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go === "bola" ? "cruz" : "bola"
    infoDisplay.textContent = "Agora é a vez da " + go 
    e.target.removeEventListener("click", addGo)
    checkScore()
}

function checkScore(){
    const allSquares = document.querySelectorAll (".square")
    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]

    console.log(allSquares[4])

    winningCombos.forEach(array => {
        const bolaWins = array.every(cell => 
            allSquares[cell].firstChild?.classList.contains('bola'))
            
        if (bolaWins) {
            infoDisplay.textContent = "A BOLA Venceu!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
    
        })

    winningCombos.forEach(array => {
        const cruzWins = array.every(cell => 
            allSquares[cell].firstChild?.classList.contains('cruz'))
            
        if (cruzWins) {
            infoDisplay.textContent = "A CRUZ Venceu!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
    
        })

        restartButton.addEventListener("click", restartGame);

}


