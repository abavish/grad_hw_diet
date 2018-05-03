var WebSocket = require("ws");
var WebSocketServer = WebSocket.Server;
var port = 3001;
var topic = "",
  broadcastData = "";
var ws = new WebSocketServer({
  port: port
});

//array to hold the messages
var messages = [];

console.log("websockets server started");

ws.on("connection", function(socket) {
  console.log("client connection established");

  //send topic message first to new users
  if (topic) {
    socket.send("*** Topic is '" + topic + "'");
  }

  messages.forEach(function(msg) {
    socket.send(msg);
  });

  socket.on("message", function(data) {
    console.log("message received: " + data);

    //checking if /topic exists at the beginning of a chat
    if (data.indexOf("/topic") === 0) {
      //console.log("topic change initiated");
      topic = data.slice(6);
      //console.log(topic);
      broadcastData = "*** Topic has changed to'" + topic + "'";
    } else {
      //push chat messages to array only if they are not a topic command
      broadcastData = data;
      // messages.push(data);
      messages.push(broadcastData);
    }

    //broadcasting message to every client. Hence deleted socket.send(data)
    //WebSockets keeps track of connected users
    ws.clients.forEach(function(clientSocket) {
      //clientSocket.send(data);
      clientSocket.send(broadcastData);
    });
  });
});
