
var LEFT_ARROW = 37;
var UP_ARROW = 38;
var RIGHT_ARROW = 39;
var DOWN_ARROW = 40;
var SPACEBAR = 32;
var Q_KEY = 113;
var W_KEY = 119;
var E_KEY = 101;
var A_KEY = 97;
var S_KEY = 115;
var D_KEY = 100;

var LEFT = -1;
var RIGHT = 1;

var HEIGHT = 20;
var WIDTH = 10;
var GRAVITY = 1000;

var pointsEarned = 0;
var linesCleared = 0;
var nextTetramino = tetraminoFactory();
var tetramino = tetraminoFactory();
var timer;

function getCell(row,col)
{
    return document.getElementById("r"+row+"c"+col);
}

function classify(row,col,color)
{
    var cell = getCell(row,col);
    cell.className = color;
}

function classifyTetramino(t,color)
{
    var cells = t.configuration(t.row,t.col,t.orientation);
    for (var i=0; i<cells.length; i++)
    {
        var coordinate = cells[i];
        classify(coordinate[0],coordinate[1],color);
    }
}

function show(t)
{
    classifyTetramino(t,t.flavor);
}

function hide(t)
{
    classifyTetramino(t,"empty");
}

function freeze(t)
{
    classifyTetramino(t,"frozen");
}

function tetraminoOnDeck(t)
{
    var div = document.getElementById("smallboard");
    div.innerHTML = t.html;
}

function makeTable()
{
    var table = document.createElement("table");
    for (var i=0; i<HEIGHT; i++)
    {
        var row = document.createElement("tr");
        for (var j=0; j<WIDTH; j++)
        {
            var cell = document.createElement("td");
            cell.setAttribute("id","r"+i+"c"+j);
            cell.className = "empty";
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    return table;
}

function prepare()
{
    var board = document.getElementById("board");
    var table = makeTable();
    board.appendChild(table);
}

function tetris()
{
    var lines = 0;
    for (var row=HEIGHT-1; row>=0; row--)
    {
        var blocks = 0;
        for (var col=0; col<WIDTH; col++)
        {
            var cell = getCell(row,col);
            if (cell.className == "frozen")
            {
                blocks++;
            }
            else
            {
                break;
            }
        }
        if (blocks == WIDTH)
        {
            lines++;
            for (var col=0; col<WIDTH; col++)
            {
                var cell = getCell(row,col);
                cell.className = "empty";
            }
        }
        else if (lines > 0)
        {
            for (var col=0; col<WIDTH; col++)
            {
                var cell = getCell(row,col);
                if (cell.className == "frozen")
                {
                    cell.className = "empty";
                    getCell(row+lines,col).className = "frozen";
                }
            }
        }
    }
    return lines;
}

function score(n)
{
    scores = [0,100,300,500,800];
    return scores[n];
}

function updateBox(elementId,value)
{
    var box = document.getElementById(elementId);
    for (var i=0; i<box.childNodes.length; i++)
    {
        var childNode = box.childNodes[i];
        if (childNode.nodeType == 3)
        {
            var textNode = document.createTextNode(value);
            box.replaceChild(textNode,childNode);
        }
    }
}

function updateScore()
{
    updateBox("pointbox",pointsEarned);
    updateBox("linebox",linesCleared);
    updateBox("speedbox",level()+1);
}

function collision(cells)
{
    for (var i=0; i<cells.length; i++)
    {
        var row = cells[i][0];
        var col = cells[i][1];
        if ((row >= HEIGHT) || (col < 0) || (col >= WIDTH))
        {
            return true;
        }
        var cell = getCell(row,col);
        if (cell.className == "frozen") //"tetramino.color" is allowed (to avoid self-colliding)
        {
            return true
        }
    }
    return false;
}

function level()
{
    return Math.min(Math.floor(linesCleared/10),19);
}

function updateGravity()
{
    GRAVITY = 1000-40*level();
}

function drop()
{
    if (collision(tetramino.dropped()))
    {
        freeze(tetramino);
        lines = tetris();
        pointsEarned = pointsEarned + score(lines);
        linesCleared = linesCleared + lines;
        updateGravity();
        updateScore();
        tetramino = nextTetramino;
        nextTetramino = tetraminoFactory();
        if (collision(tetramino.rested()))
        {
            gameOver();
        }
        else
        {
            tetraminoOnDeck(nextTetramino);
            show(tetramino);
        }
    }
    else
    {
        hide(tetramino);
        tetramino.drop();
        show(tetramino);
    }
}

function fall()
{
    drop();
    if (GRAVITY)
    {
        timer = setTimeout("fall()",GRAVITY);
    }
}

function rotate(delta)
{
    if (!collision(tetramino.rotated(delta)))
    {
        hide(tetramino);
        tetramino.rotate(delta);
        show(tetramino);
    }
}

function flip()
{
    if (!collision(tetramino.flipped()))
    {
        hide(tetramino);
        tetramino.flip();
        show(tetramino);
    }
}

function translate(delta)
{
    if (!collision(tetramino.translated(delta)))
    {
        hide(tetramino);
        tetramino.translate(delta);
        show(tetramino);
    }
}

function S(id)
{
    return document.getElementById(id).style;
}

function pause()
{
    document.onkeypress = function (e)
    {
        var keycode = e.keyCode || e.which;
        if (keycode == SPACEBAR)
        {
            S("overlay").visibility = "hidden";
            S("pause").visibility = "hidden";
            document.onkeypress = consoleInput;
            timer = setTimeout("fall()",GRAVITY);
        }
    }
    clearTimeout(timer);
    S("overlay").visibility = "visible";
    S("pause").visibility = "visible";
}

function gameOver()
{
    document.onkeypress = function() {}
    GRAVITY = 0; //signals that the game has ended
    clearTimeout(timer);
    S("overlay").visibility = "visible";
    S("gameover").visibility = "visible";
}

function consoleInput(e)
{
    var keycode = e.keyCode || e.which;
    if ((keycode == DOWN_ARROW) || (keycode == S_KEY))
    {
        drop();
    }
    else if ((keycode == UP_ARROW) || (keycode == Q_KEY))
    {
        rotate(LEFT);
    }
    else if (keycode == E_KEY)
    {
        rotate(RIGHT);
    }
    else if (keycode == W_KEY)
    {
        flip();
    }
    else if ((keycode == LEFT_ARROW) || (keycode == A_KEY))
    {
        translate(LEFT);
    }
    else if ((keycode == RIGHT_ARROW) || (keycode == D_KEY))
    {
        translate(RIGHT);
    }
    else if (keycode == SPACEBAR)
    {
        pause();
    }
    else
    {
        //do nothing
    }
}

function newGame()
{
    pointsEarned = 0;
    linesCleared = 0;
    updateScore();
    nextTetramino = tetraminoFactory();
    tetraminoOnDeck(nextTetramino);
    tetramino = tetraminoFactory();
    show(tetramino);
    document.onkeypress = consoleInput;
    
    timer = setTimeout("fall()",GRAVITY);
}

function main()
{
    prepare();
    newGame();
}

window.onload = main;
