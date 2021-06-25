const availableColors = ["RED", "YELLOW", "BLUE", "GREEN"];

let hasStarted = false;

let sequence = [];

let userSequence = [];

let level = 0;

function animateColorBox(color) {
    document.getElementById(color).animate({ opacity: 0.3 }, { duration: 800 })
}

const chooseRandomColor = () => availableColors[Math.floor(Math.random() * 4)];

function playSound(name) {
    if (name === "GREEN") {
        var green = new Audio("Audio/green.mp3");
        green.play();
    } else if (name === "RED") {
        var red = new Audio("Audio/red.mp3");
        red.play();
    } else if (name === "YELLOW") {
        var yellow = new Audio("Audio/yellow.mp3");
        yellow.play();
    } else if (name === "BLUE") {
        var blue = new Audio("Audio/blue.mp3");
        blue.play();
    } else if (name === "START") {
        // TODO: ADD START SOUND
    } else if (name === "WRONG") {
        var wrong = new Audio("Audio/wrong.mp3");
        wrong.play();
    }
}

function checkInput() {

    for (let k = 0; k < userSequence.length; k++) {
        if (sequence[k] === userSequence[k]) {
            if (sequence.length === userSequence.length) {
                //level up
                startNextLevel();
            }
        } else {
            endGame();
        }

    }

}

function startNextLevel() {
    console.log(`Level up to ${level + 1 }`)
        ++level;
    const color = chooseRandomColor();
    sequence.push(color);
    userSequence = [];
    animateColorBox(color);

}

function endGame() {
    playSound("END")
    console.log("Game Over");
    level = 0;
    userSequence = [];
    sequence = []
}

function startGame() {
    // listen for A-keypress
    $(document).keypress(function() {
        if (!hasStarted) {
            console.log("Starting Game");
            //Play start sound
            playSound("START")
                // choose random color
            let color = chooseRandomColor();
            //add color to the sequence
            sequence.push(color);
            animateColorBox(color);
            ++level;
            hasStarted = true;
        }
    });

    // add click listeners to all 4 buttons
    $(".btn").click(function(e) {
        let chosenColor = e.target.id;
        userSequence.push(chosenColor);
        playSound(chosenColor);
        checkInput();
        animateColorBox(chosenColor)
            // TODO: ADD CLICK ANIMATION
    })
}

startGame();

/*

SEQUENCE = ["GREEN", "RED", "YELLOW"]

func ->  startGame()
    - animate a random box
    - store random selected color in an array
    - add click event listner()

func ->  checkInput()
    - check for sequence match
        - TRUE: nextLevel()
        - FALSE: ENDGAME

func ->  endGame()
    - animate
    - play wrong sound
    - reset game

*/
/*

arrow function
target
array
small function in js
flag variable
const
prefer let over var
*/