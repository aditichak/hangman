Globals = {

    "difficulty": "hard",
    "alphabet": ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    "letters": '',
    "stage": '',
    "winCounter": 0,
    "theme":"blackboard", /* blackboard | 3D */
    "lineColor": "#000000",
    "letterBlocks":"blockW.png", /* block.png | blockW.png */
    "backgroundTheme":"blackboard.png" /* assets/blackboard.png | assets/notepadV.png */
};


/** * getRandom * Description
 * @param {type} max* Description
 * @param {type} min* Description
 **/
function getRandom(max, min) {
    return Math.floor(Math.random() * (1 + min - max) + min);
}