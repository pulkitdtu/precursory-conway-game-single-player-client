game_canvas = 
{
    grid : window.grid,
    context : document.getElementById("game_canvas").getContext("2d"),
    height : 10, width : 10,
    color : null,
    init : function()
    {
        grid.init();//document.getElementById("game_canvas").style.height = "100%";
    },
    paint : function(changeSet)// changeSet to context of the canvas 
    {
        var s = changeSet;
        for(let e of s)
        {
            update(e.x, e.y, e.color);
            grid.update(x, y, color);
        }
    },
    paintAfterStep : function(changeSet)
    {
        for(let e of changeSet)
        {//color = "#00002";if(e.presentColor == null)color = null;
            this.updateIndices(e.x, e.y, e.presentColor);
        }
    },
    repaint : function() // copy grid to canvas
    {
        for(i = 0; i< 200; i++)
        {
            for(j=0 ;j< 200; j++)
            {
                temp = this.grid.board[ i * 200 + j];
                if(temp.state == true)
                    update(i, j, temp.color);
            }
        }
    },
    clear : function()// clear the canvas
    {
        context.clearRect(0, 0, document.getElementById("game_canvas").width, document.getElementById("game_canvas").height);
        this.grid.clear();
    },
    updateFromOffsetPositions : function(x,y,color) // x, y are offsets from the top-left of the canvas
    {
        x -= x% this.width ;
        y -= y% this.height;
        context.fillStyle = color;
        context.fillRect(x, y, this.width, this.height);
        this.grid.update(y/this.height, x/this.width, color);
    },
    updateIndices: function(x, y, color)
    {
        if(color == null)
            context.clearRect(y * this.width, x * this.height, this.width, this.height);
        else
        {
            context.fillStyle = this.rgb(color);//color;//
            context.fillRect(y * this.width, x * this.height, this.width, this.height);
        }
    },
    updateGrid: function (x, y , color)
    {
        this.grid.update(y, x, color);
    },

    updateIndicesPlusGrid( x, y, color)
    {
        if(this.grid.isFilled(y,x))
            color = null;
        this.updateIndices(y,x, color);
        this.updateGrid(x,y, color);
    },

    step : function()
    {
        this.grid.step2();
        this.grid.step2();
        this.paintAfterStep(this.grid.changeSet);
    },

    rgb : function (colorArray){
        return "rgb("+colorArray[0]+","+colorArray[1]+","+colorArray[2]+")";
      }


};
window.game_canvas = game_canvas;

String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };