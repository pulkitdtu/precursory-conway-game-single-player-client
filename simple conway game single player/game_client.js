
console.log('client started');
var context = document.getElementById("game_canvas").getContext("2d");
var game_canvas = window.game_canvas;
window.controller.init();
connect();
function connect()
{
uri = "ws://127.0.0.1:10000";
location.origin;
 
var socket = new WebSocket(uri);
socket.onopen = function (e) {
  console.log('socket.onopen called.');
  window.controller.startConnection(socket);
};
socket.onmessage = function (e) {
  window.controller.receive(e);
};
socket.onclose = function (e) {
  console.log('socket closed');
  setTimeout(function(){connect()}, 15000);
 };
socket.onerror = function (e) {
  console.log('socket error');
  socket.onclose(e);
 };
}

document.getElementById("game_canvas").addEventListener("mousedown", getPosition, false);
function getPosition(event) {
  var x = new Number();
  var y = new Number();
  var canvas = document.getElementById("game_canvas");
  if (event.x != undefined && event.y != undefined) {
    x = event.x;
    y = event.y;
  }
  else // Firefox method to get the position
  {
    x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  x -= canvas.offsetLeft - document.body.scrollLeft;
  y -= canvas.offsetTop - document.body.scrollTop;
  window.controller.sendUpdate(x,y);
}

var clearButton = document.getElementById("clear");
document.getElementById("clear").addEventListener("click", window.controller.clear);

document.getElementById("patternButton").addEventListener("click", window.controller.submitPattern);



//socket.hello = function (e) { };
//socket.send('hello');

// game_canvas.updateFromOffsetPositions(10 * 10, 10 * 10, "#00002");
// game_canvas.updateFromOffsetPositions(10 * 10, 11 * 10, "#00002");
// game_canvas.updateFromOffsetPositions(10 * 10, 12 * 10, "#00002");
// game_canvas.updateFromOffsetPositions(9 * 10, 12 * 10, "#00002");
// game_canvas.updateFromOffsetPositions(8 * 10, 11 * 10, "#00002");

//game_canvas.updateFromOffsetPositions(10 * 10, 40 * 10, "#00002");
//game_canvas.updateFromOffsetPositions(11 * 10, 40 * 10, "#00002");
//game_canvas.updateFromOffsetPositions(12 * 10, 40 * 10, "#00002");

// game_canvas.updateFromOffsetPositions(13 * 10, 40 * 10, "#00002");
// game_canvas.updateFromOffsetPositions(14 * 10, 40 * 10, "#00002");
// game_canvas.updateFromOffsetPositions(15 * 10, 40 * 10, "#00002");
// game_canvas.updateFromOffsetPositions(16 * 10, 40 * 10, "#00002");
// game_canvas.updateFromOffsetPositions(17 * 10, 40 * 10, "#00002");
// game_canvas.updateFromOffsetPositions(18 * 10, 40 * 10, "#00002");
// game_canvas.updateFromOffsetPositions(19 * 10, 40 * 10, "#00002");





//var timerExecutor = setInterval(timerFunction, 2);

//function timerFunction() {
  //lock
  //game_canvas.step();
  //console.log('timer ticked');
  //
  //for(var i =0;i <40; i++ )
    //window.controller.sendUpdate(10 + 10 *i, 10 +  10 *i);
//}
//WebSocket s =
// let socket = net.createConnection({ port: 8000, host: 'localhost' });
// socket.on('connect', () => {
//   let networker = new Networker(socket, (data) => {
//     console.log('received:', data.toString());
//   });
//   networker.init();
//   networker.send('Hi Server!');
// });
// D:\Client\node_modules\.bin>browserify ../../game_client.js -o ../../game_clientConverted.js

  //console.log('blob message from server', e.data);
  //console.log('message form server', e.srcElement.result);

  // var reader = new FileReader();
  // reader.onload = function (e1) {
  //   let a = new Uint8Array(e1.srcElement.result);
  //   console.log(a);
  // }
  // reader.readAsArrayBuffer(e.data);
  //window.controller.receive(e);
  // if(e.data.type == '')
  // reader.readAsText(e.data);
  // socket.send(' you send a message');

  //import a from "./networker";
//var net = require('net');
//var has = require('isarray');

//var networker = require('./networker');

