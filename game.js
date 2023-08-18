var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var randomChosenColor;

var level = 0;

var started = true;

$(".btn").click(function (){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function (){
    nextSequence();
});


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
            nextSequence();
            }, 1000);
        }
    }
    else{
        $("#level-title").text("Game Over, Press Any key to Restart the game.");
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function (){
            $("body").removeClass("game-over");
        }, 200);

        console.log("Wrong");
        startOver();
    }
}


function nextSequence(){
    userClickedPattern = [];
    $("#level-title").text("Level "+ level);
    var randomNumber = Math.floor(Math.random()*4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    
    $("#"+randomChosenColor).fadeOut(1000).fadeIn(1000);
    playSound(randomChosenColor);
    // var audio = new Audio("sounds/"+randomChosenColor+".mp3");
    // audio.play();
    level++;
    // console.log(level+ randomChosenColor);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    
    setTimeout(function (){
        $("."+currentColor).removeClass("pressed");
    }, 100);


}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
    // nextSequence();

// console.log(gamePattern);
