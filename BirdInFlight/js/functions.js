const timeToWait = 1000;
const minCreationDelay = 1;
const maxCreationDelay = 3;
const minTime = 5;
const maxTime = 8;
const gameTime = 30;
const maxNumBird = 10;

//********************* var *************************
var newLine = "\n";

var bulletsLeft = "Bullets left: <br>";
var reloading = "Reloading <br> 1s ";

var clicks = 6;
var gameStopped = true;
var score = 0;
var birdsPassed = 0;
var interval;
var Timer;
var TimeChange = 0;
var gamePaused = true;

var running = false;

//************************ play *******************************

$('#play').click(play);
$('.screen').click(click);
$("#Pause").click(pauseContinue);
$("#reset").click(reset);
$('#more').click(TimeMore);
$('#more10').click(TimeMoreTen);
$('#less').click(TimeLess);
$('#less10').click(TimeLessTen);
$('#x').click(x);
$(".instruction").click(theInstruction);



$('.count_bullets').html(bulletsLeft + clicks);
$('.birdsPassed').html("Birds Passed: <br>" + birdsPassed);
$('.scoreLine').html("Score: <br>" + score);
printTime();

//*************************** function ***********************************

function play() {
    if (gameStopped == true && gamePaused == true) {
        $('.result').animate({
            top: '-20%'
        }, 2000);
        gamePaused = false;
        gameStopped = false;
        reloaded();
        startTimer();
        timePassed = 0;
        timeBeforeNext = 1;
        interval = setInterval(delayBird, 1000);

    }
}
//*************************
function delayBird() {
    timePassed++;
    if (timePassed == timeBeforeNext) {
        createBird();
        timePassed = 0;
        timeBeforeNext = getRndInteger(minCreationDelay, maxCreationDelay);
    }
}
//*************************
function createBird() {
    lane = getRndInteger(1, 4);
    var createBirdImg = $('<div class="img"></div>');
    $('.img' + lane).append(createBirdImg);
    time = getRndInteger(minTime, maxTime);
    $('.board .img').animate({
        left: '100%'
    }, 1000 * time, removeBirds);

    function removeBirds() {
        $(this).remove();
        if (gameStopped == false) {
            updateBirdsPassed();
        }
    }

    $('.img').click(killBird);

    function killBird() {
        if (gamePaused == false) {
            if (clicks > 0) {
                $(this).stop();
                $(this).remove();
                updateScore();
            }
        }
    }


}
//*************************
function printScore() {
    $('.scoreLine').html("Score: <br>" + score);
}

function printTime() {
    $('.printTime span').html(TimeChange + gameTime);
}


//*************************
function click() {
    if ((gamePaused == false) && (gameStopped == false)) {
        //if (gamePaused == false) {

        clicks--;
        if (clicks > 0) {
            $('.count_bullets').html(bulletsLeft + clicks);
            audioa.play();
        }
        if (clicks == 0) {
            audiob.play();
            $('.count_bullets').html(reloading);
            $('.board').css('cursor', 'no-drop');
            setTimeout(reloaded, timeToWait);
        }
        //        }
    }
}

var audioa = new Audio('./sound/Gun_Reload_sound.mp3');
var audiob = new Audio('./sound/Gun_Reload_sound.mp3');

//*************************
function reloaded() {
    clicks = 6;
    $('.count_bullets').html(bulletsLeft + clicks);
    $('.board').css('cursor', 'url(./imgs/2038-200.png) 20 20, auto');
};
//*************************
function updateScore() {
    score++;
    printScore();
}
//*************************


function updateBirdsPassed() {
    birdsPassed++;
    $('.birdsPassed').html("Birds Passed: <br>" + birdsPassed);
    if (birdsPassed == maxNumBird) {

        $('.text ul').append("<li>you lost</li>");
        stopGame();

    }
}
//*************************
function TimeMore() {
    TimeChange++;
    printTime();
}

function TimeMoreTen() {
    TimeChange += 10;
    printTime();
}

function TimeLess() {
    TimeChange--;
    printTime();
}

function TimeLessTen() {
    TimeChange -= 10;
    printTime();
}
//**********************
function startTimer() {
    timer = gameTime + TimeChange;
    updateTime();
    Timer = setInterval(updateTime, 100);
}
//*************************
function updateTime() {
    if ((gamePaused == false) && (gameStopped == false)) {
        timer -= 0.1;
        var t = timer.toFixed(1);
        if (timer <= -1) {
            $('.printTime span').html(t);
        } else {
            if (timer <= 0) {
                timer = 0;
            }

            $('.printTime span').html(t);
            if (timer <= 0) {
                stopGame();
            }
        }
    }
}

//*************************
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max + 0.999999 - min)) + min;
}
//*************************


// gamePaused false = true
function continueGame() {
    if (gameStopped == false) {
        gamePaused = false;
        $('.count_bullets').html(bulletsLeft + clicks);
        $('.board').css('cursor', 'url(./imgs/2038-200.png) 20 20, auto');
        interval = setInterval(delayBird, 1000);
    }
}

function pauseGame() {
    gamePaused = true;
    clearInterval(interval);
    $('.count_bullets').html("Stop");
    $('.board').css('cursor', 'no-drop');
    $('.board .img').stop(true, false);
}

function pauseContinue() {
    if (gamePaused == false) {
        $('#Pause').val("Continue");
        pauseGame();
    } else {
        continueGame();
        $('#Pause').val("Pause");
    }
}

//*************************




function reset() {

    if (gameStopped == false) {

        gameStopped = true;
        gamePaused = true;
        clearInterval(interval);
        clearInterval(Timer);
        alerts2();
        running = true;
        $('.result').animate({
            top: '50%'
        }, 1000);
        score = -1;
        updateScore();
        $('.img').remove();
        birdsPassed = -1;
        updateBirdsPassed();
        printTime();
    } else if (running == false) {
        running = true;
        $('.result').animate({
            top: '50%'
        }, 1000);
        $('.text ul').html("<li>The game will not start yet</li>");
    }
}
//********** stopGame ***************

function stopGame() {
    if (gameStopped == false) {
        //gamePaused = true;
        //gameStopped = true;
        $('.result').animate({
            top: '50%'
        }, 1000);
        clearInterval(interval);
        clearInterval(Timer);
        reset();
    }
}

//************************
//$('.result').animate({
//    top: '50%'
//}, 2000);

function x() {
    running = false;
    $('.result').animate({
        top: '-20%'
    }, 1000);

    //    if ($('.result').css('top') == '50%') {
    //        $('.result').animate({
    //            top: '-20%'
    //        }, 1000);
    //    } else {
    //        $('.result').animate({
    //            top: '50%'
    //        }, 2000);
    //    }
}

function theInstruction() {
    $(".theInstruction").fadeToggle();
}


//*********** alerts *******
function alerts() {
    alert("gameStopped" + ' = ' + gameStopped + newLine + "score" + ' = ' + score + newLine + "birdsPasse" + ' = ' + birdsPassed + newLine + "Timer" + ' = ' + Timer + newLine + "gamePaused" + ' = ' + gamePaused);
}

function alerts2() {
    $('.text ul').html("<li> score = " + score + " </li>" + "<li> Birds Passed = " + birdsPassed + " </li>");

}





3
3
3
3
3
3
3
3
3
3
3
3
3
3
3
3
