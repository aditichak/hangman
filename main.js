$(document).ready(function () {

    vex.defaultOptions.className = 'vex-theme-wireframe';

    $(".notepad").attr("src",Globals.backgroundTheme);

    if (Globals.theme === "blackboard") {
        Globals.lineColor = "#ffffff";
    }

    var word = getWord();
    Globals.word = word;
    var letters = analyzeWord(word);
    Globals.letters = letters;
    makeLetters();
    makeBlocks(letters);

    Globals.parts = createCanvas();

    window.onbeforeunload = function () {
        store.clear();
        //return "Dude, are you sure you want to leave and forfeit the fight!?";
    };

    window.onunload = function () {
        store.clear();
    };

    var updateLayout = _.debounce(scaleCanvas, 500);
    window.addEventListener("resize", updateLayout, false);

});

/**
 * [scaleCanvas description]
 * @return {[type]} [description]
 */

function scaleCanvas(){
    var scale = checkSize();
    Globals.stage.setScaleX(scale);
    Globals.stage.setScaleY(scale);
    Globals.stage.draw();
}

/**
 * [getWord description]
 * @return {[type]} [description]
 */

function getWord() {

    var _words;
    if (Globals.difficulty === "hard") {

        _words = words({
            min: 2,
            max: 10
        });

        var rand = Math.abs(getRandom(_words.length - 1, 0));
        var secretWord = _words[rand];

        console.log(secretWord);
        return secretWord;

    }

}

/**
 * [analyzeWord description]
 * @param  {[type]} word [description]
 * @return {[type]}      [description]
 */

function analyzeWord(word) {

    var arr = String(word).split('');
    return arr;

}

/**
 * [makeLetters description]
 * @return {[type]} [description]
 */

function makeLetters() {
    var container = $("#letters");
    container.empty();
    for (var i = 0; i < Globals.alphabet.length; i++) {
        container.append("<div class='alphabet' id='letter_" + i + "'>" + Globals.alphabet[i] + "</div>");
    }

    $(".alphabet").on("mousedown click touchstart", checkLetter);
}

/**
 * [makeBlocks description]
 * @param  {[type]} letters [description]
 * @return {[type]}         [description]
 */

function makeBlocks(letters) {

    var container = $(".blocks");
    container.empty();
    for (var i = 0; i < letters.length; i++) {
        container.append("<div class='blockContainer' id='blockContainer" + i + "'><img src='" + Globals.letterBlocks + "' class='blockes'/> <span class='secretLetter'>" + letters[i] + "</span></div>");
    }

}

/**
 * [checkSize description]
 * @return {[type]} [description]
 */

function checkSize() {
    if ($(window).width() < 768) {
        return 0.5;
    }

    if ($(window).height() <= 768) {
        return 0.5;
    }

    if($(window).height() > 768){
        return 1;
    }
}


/**
 * [checkLetter description]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */

function checkLetter(e) {
    lockKeys();
    if ($(e.currentTarget).hasClass('grayscale')) {
        unlockKeys();
        return false;
    }

    var item = String($(e.currentTarget).text()).toLowerCase();
    var letters = Globals.letters;

    var result = false;
    for (var i = 0; i < letters.length; i++) {
        if (letters[i] === item) {
            result = true;
            Globals.winCounter += 1;
            animateLetter(i);
            result = true;
            unlockKeys();
        }
    }

    $(e.currentTarget).addClass('grayscale');

    if (result === false) {

        if (Globals.parts.length === 0) {
            animateShock(0);


            return true;
        }

        var newPart = Globals.parts[0];
        newPart();

        Globals.parts.splice(0, 1);
    }

    // check win //
    if (Globals.winCounter === Globals.letters.length) {
        openDialog('win');
        var wins = store.get("wins");
        if (wins === undefined || wins === null) {
            wins = 0;
        }
        store.set("wins", wins + 1);
        return true;
    }

    if (Globals.parts.length === 0) {
        //openDialog('loss');
        return true;
    }

}

/**
 * [lockKeys description]
 * @return {[type]} [description]
 */

function lockKeys() {
    $(".alphabet").off("mousedown", checkLetter);
}

/**
 * [unlockKeys description]
 * @return {[type]} [description]
 */

function unlockKeys() {
    $(".alphabet").on("mousedown", checkLetter);
}

/**
 * [openDialog description]
 * @param  {[type]} command [description]
 * @return {[type]}         [description]
 */

function openDialog(command) {

    var message;
    if (command === "win") {
        message = "Victory! <br/> Play another game?";
    } else if (command === "loss") {
        message = "Game Over... <br/> The correct word was: <strong class='red'>" + Globals.word + "</strong><br/>" + "New Game?";
    }

    var $vex = vex.dialog.confirm({
        message: message,
        callback: function (value) {
            if (value === true || value === 'true' || value === false) {
                reset($vex);
                return true;
            }
        }
    });

}

/**
 * [animateLetter description]
 * @param  {[type]} index [description]
 * @return {[type]}       [description]
 */

function animateLetter(index) {
    var bottom = 15;
    if ($(window).width() < 480) {
        bottom = 7;
    }

    TweenMax.to("#blockContainer" + index + " .secretLetter", 0.8, {
        display: 'block',
        autoAlpha: 1,
        bottom: bottom
    });
}

/**
 * [reset description]
 * @param  {[type]} $vexContent [description]
 * @return {[type]}             [description]
 */

function reset($vexContent) {
    var word = getWord();
    Globals.word = word;
    var letters = analyzeWord(word);
    Globals.letters = letters;
    makeLetters();
    makeBlocks(letters);

    store.clear();
    Globals.winCounter = 0;
    Globals.parts = createCanvas();
}