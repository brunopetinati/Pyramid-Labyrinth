/* A realização desse exercício consiste em três partes principais: a movimentação, a construção do labirinto e 
definições de classes, e uma função que checa se a movimentação.  */


let player = document.getElementById("player")

let labirinto = document.getElementById("labirinto")

//Construção do labirinto

const map = [
    "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "W W                 W           W",
    "W W WWWWW W WWWWW WWW WWWWWWWWW W",
    "W W     W W     W   W   W     W W",
    "W WWWWW W WWW W W WWWWW W WWWWW W",
    "W   W       W W W   W   W W     W",
    "W W W WWWWWWWWW WWWWWWW W W WWW W",
    "W W W     W   W           W W   W",
    "W WWWWW WWW WWWWWWW WWWWW W W WWW",
    "W         W W   W   W     W W   W",
    "WWW W WWWWW WWW WWWWWWWWWWW WWW W",
    "W   W W       W     W         W W",
    "W W     W W W     W W W WWWWW W W",
    "W W WWWWW W WWWWWWW W W W W   WWW",
    "W W W     W W       W     W W   W",
    "W W W WWW W W WWW WWW WWWWW WWW W",
    "W W W     W     W   W     W   W W",
    "W W W WWW WWWWW WWWWWWWWW W WWW W",
    "W W W   W   WSW   W         W   W",
    "W WWWWW WWWWW W WWW W WWWWWWW WWW",
    "W       W W W   W   W   W       W",
    "WWWWW WWW W WWWWWWW W WWW WWW W W",
    "W W     W   W       W W     W W W",
    "W WWWWW WWW W W WWWWWWWWWWWWWWW W",
    "W     W   W W W   W W       W   W",
    "W WWW WWWWW W WWWWW W WWW WWW WWW",
    "W   W W         W   W W     W W W",
    "WWWWW W WWWWWWW W WWW W WWW WWW W",
    "W       W     W       W W W     W",
    "W WWW WWWWWWW W WWWWW WWW WWW WWW",
    "W W       W       W         W  FW",
    "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"
];


// necessário 2 for. Um para separar o array const map, usando método map.split
// o segundo for trata de cada caso após o resultado de map.split, atribuindo a cada caractere uma operação diferente.


let arrayParedes = []

let posicaoFim = []

for (let i = 0 ; i < map.length; i++) {

    let celula = map[i].split("")
    let labirintodisplay = document.createElement("div")

    labirintodisplay.className = "labirinto"

    for (let j = 0 ; j < celula.length ; j++) {
        switch (celula[j]) {
            case "W":
                let parede = document.createElement("div")
                parede.className = "parede"
                labirintodisplay.appendChild(parede)
                let posicaoParede = [i, j]
                arrayParedes.push(posicaoParede)
                break
            case " ":
                let caminho = document.createElement("div")
                caminho.className = "caminho"
                labirintodisplay.appendChild(caminho)
                break
            case "S":
                labirintodisplay.appendChild(player)
                let inicio = document.createElement("div")
                inicio.className = "inicio"
                labirintodisplay.appendChild(inicio)
                break
            case "F":
                let final = document.createElement("div")
                final.className = "fim"
                labirintodisplay.appendChild(final)
                //aqui identificamos a posição em que F se encontra no array. posicaoFim = [30,31]
                posicaoFim = [i, j]
                break
        }
    }
    labirinto.appendChild(labirintodisplay)
}


// Movimentação


// posição inicial do jogador em css

player.style.top = 13
player.style.left = 18

// posição inicial armazenada em memória para cálculos de movimentação

let eixoX = 13;
let eixoY = 18;


document.addEventListener('keydown', event => {

    const keyName = event.key;

    switch (keyName) {
        case "ArrowUp":
            if (checagem(eixoY - 1, eixoX) == false) {
                eixoY -= 1
            }
            break
        case "ArrowDown":
            if (checagem(eixoY + 1, eixoX) == false) {
                eixoY += 1
            }
            break
        case "ArrowRight":
            if (checagem(eixoY, eixoX + 1) == false) {
                eixoX += 1
            }
            break
        case "ArrowLeft":
            if (checagem(eixoY, eixoX + -1) == false) {
                eixoX -= 1
            }
            break
    }

    //atribuição do cálculo de movimentação ao player.css

    player.style.top = eixoY * 28 + "px";
    player.style.left = eixoX * 28 + "px";

    // eixoX e eixoY são atualizados a cada evento de keydown
    // no array posicaoFim[30,31], identificado por [i,j] em map[i].split("") switch case F, podemos
    // igualar o valor atribuido ao eixoY e eixoX para  

    if (eixoY == posicaoFim[0] && eixoX == posicaoFim[1]) {
        alert("Parabéns, você conseguiu atravessar a base da pirâmide!!")
        eixoX = 13;
        eixoY = 18;
    }
});




// 3. Função que checa a movimentação

// usa-se o array de paredes (onde encontram-se todos os "casos de W")

function checagem(vertical, horizontal) {
    for (let k = 0 ; k < arrayParedes.length ; k++) {
        //paredes "W" estão localizadas no arrayParedes, sendo suas posições atribuídas pelo map.split("") pelo for i e for j, em outras palavras
        //célula de uma parede = localização de uma parede "W" em [i][j] em map.split("")
        //na linha abaixo, o k representa esse for. [k][0] representa a posição i, e [k][1] representa a posição j em arrayParedes para a identificação de uma parede
        if (vertical == arrayParedes[k][0] && horizontal == arrayParedes[k][1]) {
            return true
        }
    } return false
}

// exemplo:
// se eixoX = 12 e eixoY = 18, temos uma parede (que está localizada uma célula à esquerda da posição inicial S)
// que será comparada em == arrayParedes[k][0] e [k][1]
