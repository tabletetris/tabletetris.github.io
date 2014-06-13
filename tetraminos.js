
function mod(element,modulus)
{
    var result = element%modulus;
    return (result < 0) ? result + modulus : result;
}

function Tetramino()
{
    this.row = 0;
    this.col = 0;
    this.orientation = 0;
    this.rotate = function(delta)
    {
        this.orientation = mod(this.orientation+delta,this.symmetry);
    }
    this.flip = function()
    {
        this.orientation = mod(this.orientation+2,this.symmetry);
    }
    this.drop = function()
    {
        this.row++;
    }
    this.translate = function(delta)
    {
        this.col = this.col + delta;
    }
    this.rested = function()
    {
        return this.configuration(this.row,this.col,this.orientation);
    }
    this.rotated = function(delta)
    {
        return this.configuration(this.row,this.col,mod(this.orientation+delta,this.symmetry));
    }
    this.flipped = function()
    {
        return this.configuration(this.row,this.col,mod(this.orientation+2,this.symmetry));
    }
    this.dropped = function()
    {
        return this.configuration(this.row+1,this.col,this.orientation);
    }
    this.translated = function(delta)
    {
        return this.configuration(this.row,this.col+delta,this.orientation);
    }
}

function Square()
{
    this.col = 4;
    this.flavor = "square";
    this.symmetry = 1;
    this.html = "<table><tr><td class=\"square\"></td><td class=\"square\"></td></tr><tr><td class=\"square\"></td><td class=\"square\"></td></tr></table>";
    this.configuration = function(row,col,orientation)
    {
        return [[row,col],[row,col+1],[row+1,col],[row+1,col+1]];
    }
}
Square.prototype = new Tetramino();

// "I"
function Stick()
{
    this.col = 3;
    this.flavor = "stick";
    this.symmetry = 2;
    this.html = "<table><tr><td class=\"stick\"></td><td class=\"stick\"></td><td class=\"stick\"></td><td class=\"stick\"></td></tr></table>";
    this.configuration = function(row,col,orientation)
    {
        if (orientation == 0)
        {
            return [[row,col],[row,col+1],[row,col+2],[row,col+3]];
        }
        else
        {
            return [[row,col],[row+1,col],[row+2,col],[row+3,col]];
        }
    }
}
Stick.prototype = new Tetramino();

// "J"
function Gamma()
{
    this.col = 3;
    this.flavor = "gamma";
    this.symmetry = 4;
    this.html = "<table><tr><td class=\"gamma\"></td><td class=\"gamma\"></td><td class=\"gamma\"></td></tr><tr><td></td><td></td><td class=\"gamma\"></td></tr></table>";
    this.configuration = function(row,col,orientation)
    {
        if (orientation == 0)
        {
            return [[row,col],[row,col+1],[row,col+2],[row+1,col+2]];
        }
        else if (orientation == 1)
        {
            return [[row,col+1],[row+1,col+1],[row+2,col],[row+2,col+1]];
        }
        else if (orientation == 2)
        {
            return [[row,col],[row+1,col],[row+1,col+1],[row+1,col+2]];
        }
        else
        {
            return [[row,col],[row,col+1],[row+1,col],[row+2,col]];
        }
    }
}
Gamma.prototype = new Tetramino();

// "L"
function Ell()
{
    this.col = 3;
    this.flavor = "ell";
    this.symmetry = 4;
    this.html = "<table><tr><td class=\"ell\"></td><td class=\"ell\"></td><td class=\"ell\"></td></tr><tr><td class=\"ell\"></td><td></td><td></td></tr></table>";
    this.configuration = function(row,col,orientation)
    {
        if (orientation == 0)
        {
            return [[row,col],[row,col+1],[row,col+2],[row+1,col]];
        }
        else if (orientation == 1)
        {
            return [[row,col],[row,col+1],[row+1,col+1],[row+2,col+1]];
        }
        else if (orientation == 2)
        {
            return [[row+1,col],[row+1,col+1],[row+1,col+2],[row,col+2]];
        }
        else
        {
            return [[row,col],[row+1,col],[row+2,col],[row+2,col+1]];
        }
    }
}
Ell.prototype = new Tetramino();

// "T"
function Tee()
{
    this.col = 3;
    this.flavor = "tee";
    this.symmetry = 4;
    this.html = "<table><tr><td class=\"tee\"></td><td class=\"tee\"></td><td class=\"tee\"></td></tr><tr><td></td><td class=\"tee\"></td><td></td></tr></table>";
    this.configuration = function(row,col,orientation)
    {
        if (orientation == 0)
        {
            return [[row,col],[row,col+1],[row,col+2],[row+1,col+1]];
        }
        else if (orientation == 1)
        {
            return [[row,col+1],[row+1,col],[row+1,col+1],[row+2,col+1]];
        }
        else if (orientation == 2)
        {
            return [[row,col+1],[row+1,col],[row+1,col+1],[row+1,col+2]];
        }
        else
        {
            return [[row,col],[row+1,col],[row+2,col],[row+1,col+1]];
        }
    }
}
Tee.prototype = new Tetramino();

// "S"
function Zig()
{
    this.col = 3;
    this.flavor = "zig";
    this.symmetry = 2;
    this.html = "<table><tr><td></td><td class=\"zig\"></td><td class=\"zig\"></td></tr><tr><td class=\"zig\"></td><td class=\"zig\"></td><td></td></tr></table>";
    this.configuration = function(row,col,orientation)
    {
        if (orientation == 0)
        {
            return [[row,col+1],[row,col+2],[row+1,col],[row+1,col+1]];
        }
        else
        {
            return [[row,col],[row+1,col],[row+1,col+1],[row+2,col+1]];
        }
    }
}
Zig.prototype = new Tetramino();

// "Z"
function Zag()
{
    this.col = 3;
    this.flavor = "zag";
    this.symmetry = 2;
    this.html = "<table><tr><td class=\"zag\"></td><td class=\"zag\"></td><td></td></tr><tr><td></td><td class=\"zag\"></td><td class=\"zag\"></td></tr></table>";
    this.configuration = function(row,col,orientation)
    {
        if (orientation == 0)
        {
            return [[row,col],[row,col+1],[row+1,col+1],[row+1,col+2]];
        }
        else
        {
            return [[row,col+1],[row+1,col],[row+1,col+1],[row+2,col]];
        }
    }
}
Zag.prototype = new Tetramino();

function tetraminoFactory()
{
    var index = Math.floor(Math.random() * 7);
    if (index == 0)
    {
        return new Square();
    }
    else if (index == 1)
    {
        return new Stick();
    }
    else if (index == 2)
    {
        return new Gamma();
    }
    else if (index == 3)
    {
        return new Ell();
    }
    else if (index == 4)
    {
        return new Tee();
    }
    else if (index == 5)
    {
        return new Zig();
    }
    else
    {
        return new Zag();
    }
}
