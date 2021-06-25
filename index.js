const color_random = ["RED", "GREEN", "YELLOW", "BLUE", "WRONG"]
let sequencecomp = [];
let usersequence = [];
let level = 0;
startgame();

function newsequence() {
    usersequence = [];
    ++level;
    $("#level-title").text("LEVEL " + level);
    var randomnumber = Math.floor(Math.random() * 4);
    console.log(randomnumber);
    var randomcolorchosen = color_random[randomnumber];
    console.log(randomcolorchosen);
    sequencecomp.push(randomcolorchosen);
    console.log(sequencecomp);
    $("#" + randomcolorchosen).animate({ opacity: 0.3 }, { duration: 800 }).animate({ opacity: 1 }, { duration: 0 });
    var audio = new Audio("Audio/" + randomcolorchosen + ".mp3");
    audio.play();
    animatePress(randomcolorchosen);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

$(".btn").click(function() {
    var userchosencolor = $(this).attr("id");
    animatePress(userchosencolor);
    usersequence.push(userchosencolor);
    console.log(usersequence);
    var audio = new Audio("Audio/" + userchosencolor + ".mp3");
    audio.play();
    checkInput();
});

function checkInput() {
    if (usersequence[usersequence.length - 1] === sequencecomp[usersequence.length - 1]) {
        if (usersequence.length === sequencecomp.length) {
            setTimeout(function() {
                newsequence();
            }, 1000);
        } else {

        }
    } else {
        endGame();
    }
}

function endGame() {
    $("#level-title").text("Game Over, Press any key to restart");
    var wrong = new Audio("Audio/WRONG.mp3");
    wrong.play();
    $("body").css("background-color", "red");
    setTimeout(function() {
        $("body").css("background-color", "#011F3F");
    }, 500);
    $(document).keypress(function(e) {
        level = 0;
        newsequence();
    })
}

function startgame() {
    $("#level-title").text("Press A Key to Start");
    $(document).keypress(function(event) {
        if (event.key === 'a' || event.key === 'A') {
            console.log("Game is Started");
            newsequence();
        } else {
            endGame();
        }
    })
}
