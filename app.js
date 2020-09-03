const grid = document.querySelector(".grid");
const width = 8;
const squares = [];
const candyColors = [
    "url(image/red-car.png)", 
    "url(image/yellow-car.png)", 
    "url(image/green-car.png)", 
    "url(image/blue-car.png)", 
    "url(image/orange-car.png)", 
    "url(image/purple-car.png)"
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
        squares.push(square)
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
    squareIdBeingReplaced = parseInt(this.id)
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
    this.style.backgroundImage = colorBeingDragged;
    console.log(this.id, "drop")
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
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
    } else {
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
    }
    console.log(this.id, "dragend")
}