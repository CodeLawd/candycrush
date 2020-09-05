const grid = document.querySelector(".grid");
const width = 8;
const squares = [];
let score = 0;
let scoreDisplay = document.getElementById("score");

const candyColors = [
    "url(image/alternative-red.png)", 
    "url(image/alternative-yellow.png)", 
    "url(image/alternative-green.png)", 
    "url(image/alternative-blue.png)", 
    "url(image/alternative-orange.png)", 
    "url(image/alternative-purple.png)"
];



// Creating the board
function createBoard() {
    for(let i=0; i < width*width; i++){
        const square = document.createElement("div");
        square.setAttribute("draggable", true);
        square.setAttribute("id", i);
        const randomColor = Math.floor(Math.random() * candyColors.length);
        square.style.backgroundImage = candyColors[randomColor];
        grid.appendChild(square);
        squares.push(square);
    }
}

createBoard();


// Dragging the candies
squares.forEach(square => square.addEventListener("dragstart", dragStart));
squares.forEach(square => square.addEventListener("dragend", dragEnd));
squares.forEach(square => square.addEventListener("dragleave", dragLeave));
squares.forEach(square => square.addEventListener("dragenter", dragEnter));
squares.forEach(square => square.addEventListener("dragover", dragOver));
squares.forEach(square => square.addEventListener("drop", dragDrop));

let colorBeingDragged, colorBeingReplaced, squareIdBeingDragged, squareIdBeingReplaced;

function dragStart() {
    colorBeingDragged = this.style.backgroundImage;
    squareIdBeingDragged = parseInt(this.id)
    console.log(this.id, "dragstart")
}

function dragLeave() {
    console.log(this.id, "dragleave")
}

function dragEnter(e) {
    e.preventDefault()
    console.log(this.id, "dragenter")
}

function dragOver(e) {
    e.preventDefault()
    console.log(this.id, "dragover")
}

function dragDrop() {
    colorBeingReplaced = this.style.backgroundImage;
    squareIdBeingReplaced = parseInt(this.id);
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
    this.style.backgroundImage = colorBeingDragged;
    console.log(this.id, "drop");
}

function dragEnd() {
    let validMoves = [
        squareIdBeingDragged - 1,
        squareIdBeingDragged - width,
        squareIdBeingDragged + 1,
        squareIdBeingDragged + width
    ];

    // validMove checks to see if the sqaureIdBeingReplaced is included in the validMoves array variable
    let validMove = validMoves.includes(squareIdBeingReplaced);
    
    /*
    - The if statement  checks if sqaureIdBeingReplaced and validMove is true, if it is, it set sqaureIdBeingReplaced to null
    - The else if statement checks if sqaureIdBeingReplaced is true and validMove is not true, if the condition is satisfied, then it replaces both squares with their original color
    */

    if(squareIdBeingReplaced && validMove) {
        squareIdBeingReplaced = null;
    } else if(squareIdBeingReplaced && !validMove) {
        squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
        //let errorColor = squares[squareIdBeingReplaced].style.backgroundColor = "red";
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
    } else {
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
    }
    console.log(this.id, "dragend")
}

// Drop candies down once some are cleared
function moveDown(){
    for (i=0; i < 55; i++){
        if(squares[i + width].style.backgroundImage === ""){
            squares[i + width].style.backgroundImage = squares[i].style.backgroundImage;
            squares[i].style.backgroundImage = "";
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
            const isFirstRow = firstRow.includes(i);
            if(isFirstRow && squares[i].style.backgroundImage === ""){
                let randomCandies = Math.floor(Math.random() * candyColors.length);
                squares[i].style.backgroundImage = candyColors[randomCandies];
            }
        }
    }
}

// Checking for matches

// Check for three
checkRowForThree = () => {
    for (i = 0; i < 61; i++){
        let rowForThree = [i, i+1, i+2];
        let decidedColor = squares[i].style.backgroundImage;
        const isBlank = squares[i].style.backgroundImage === "";
        const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63];
        if(notValid.includes(i)) continue;

        if(rowForThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
            score += 3;
            scoreDisplay.innerHTML = score;
            rowForThree.forEach(index => {
                squares[index].style.backgroundImage = "";
            })
        }
    }
}

checkRowForThree();

checkColumnForThree = () => {
    for (i = 0; i < 47; i++){
        let columnForThree = [i, i+width, i+width*2];
        let decidedColor = squares[i].style.backgroundImage;
        const isBlank = squares[i].style.backgroundImage === "";

        if(columnForThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 3;
            scoreDisplay.innerHTML = score;
            columnForThree.forEach(index => {
                squares[index].style.backgroundImage = "";
            })
        }
    }
}

checkColumnForThree();

// Check for four
checkRowForFour = () => {
    for (i = 0; i < 60; i++){
        let rowForFour = [i, i+1, i+2, i+3];
        let decidedColor = squares[i].style.backgroundImage;
        const isBlank = squares[i].style.backgroundImage === "";
        const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 61, 62, 63];
        if(notValid.includes(i)) continue;

        if(rowForFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
            score += 4;
            scoreDisplay.innerHTML = score;
            rowForFour.forEach(index => {
                squares[index].style.backgroundImage = "";
            })
        }
    }
}

checkRowForFour();

checkColumnForFour = () => {
    for (i = 0; i < 47; i++){
        let columnForFour = [i, i+width, i+width*2, i+width*3];
        let decidedColor = squares[i].style.backgroundImage;
        const isBlank = squares[i].style.backgroundImage === "";

        

        if(columnForFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 4;
            scoreDisplay.innerHTML = score;
            columnForFour.forEach(index => {
                squares[index].style.backgroundImage = "";
            })
        }

        if(columnForFour === true) {
            let gameScore = document.querySelector(".score").innerText = score;
        }
    }
}

checkColumnForFour();






window.setInterval(function(){
    moveDown()
    checkColumnForFour();
    checkRowForFour();
    checkColumnForThree()
    checkRowForThree();
}, 100);