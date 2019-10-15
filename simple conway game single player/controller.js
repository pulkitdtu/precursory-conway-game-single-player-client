
game_canvas = window.game_canvas;
window.controller = 
{
    socket : null,
    color : null,
    init : function()
    {
        this.color = window.colors.popColor(); 
        window.game_canvas.init();
        window.patterns.init();
    },
    startConnection : function(socket)
    {
        this.socket = socket;
        this.socket.send(new Uint8Array([1]));// request for encoded grid.
        
        if(window.name)
        {
            var array = JSON.parse("[" + window.name + "]");
            this.socket.send(new Uint8Array(array));
        }
        else
            this.socket.send(new Uint8Array([255,255,255]));
    },
    receive : function(e)
    {
        var data1 = null;
        var reader = new FileReader();
        reader.onload = function (e1) {
            data1 = new Uint8Array(e1.srcElement.result);
            if(data1)
            {
                if( data1.length == 1)
                    game_canvas.step();
                else if(data1.length == 3)
                    window.name = [data1[0], data1[1], data1[2]];
                else if(data1.length == 5)
                {   
                    var color2 = [data1[2], data1[3], data1[4]];//var color2 = "#000001";
                    if(data1[2] == 0 && data1[3] == 0 && data1[4] == 0)
                        color2 = null;
                    game_canvas.updateIndicesPlusGrid(data1[0], data1[1], color2);
                }
                else if(data1.length > 5  && data1[0] == 2 && (data1.length - 1) % 5 == 0)
                {
                    game_canvas.clear();
                    for(var i = 1; i < data1.length; i+=5)
                    {
                        game_canvas.updateIndicesPlusGrid(data1[i], data1[i+1],[data1[i+2], data1[i+3],data1[i+4]]);
                    };
                }
            }
        }
        reader.readAsArrayBuffer(e.data);
        
    },
    send: function(data, client)
    {
        
    },
    send : function(data)
    {
        
    },
    sendUpdate : function( x,y)// request to server
    {
        var array = new Uint8Array(2);
        array[0] = x / game_canvas.height;
        array[1] = y / game_canvas.width;
        console.log('x = '+ array[0] + ' y = ' + array[1]);
        if(this.socket != null)
            this.socket.send(array);
        else
            game_canvas.updateIndicesPlusGrid(array[0], array[1], this.color);
    },
    submitPattern : function()
    {
        if(document.querySelector('input[name="pattern"]:checked')!= null) 
        {
            var pattern = document.querySelector('input[name="pattern"]:checked').value;
            console.log('drawing : ' + pattern);
            for(let p of window.patterns.dictionary[pattern])
                game_canvas.updateIndicesPlusGrid(p[0],p[1],window.controller.color);
        }
        else
        alert('Please choose a pattern from the radio buttons before clicking on the submit button');
    },
    clear : function()
    {
        game_canvas.clear();
    },
    timer : function()
    {

    },
    step : function()
    {

    },

    stepInterval : setInterval(timerFunction, 1500)
};

function timerFunction()
{
    if(controller.socket == null)
    {
        game_canvas.step();
        console.log('timer ticked');
    }
}