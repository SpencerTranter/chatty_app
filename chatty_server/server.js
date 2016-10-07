"use strict";
const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Defining boradcast function
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

const colors = ['lawngreen', 'cornflowerblue', 'bisque', 'indigo', 'salmon', 'honeydew'];

function get_random_int(min, max) {
  let min_rounded = Math.ceil(min);
  let max_rounded = Math.floor(max);
  return Math.floor(Math.random() * (max_rounded - min_rounded)) + min_rounded;
}

function broadcast_client_count (client_array) {
  wss.broadcast(JSON.stringify({
    type: 'client_info',
    client_count: client_array.length
  }));
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  broadcast_client_count(wss.clients);

  let randomColor = colors[get_random_int(0, colors.length -1)];
  ws.send(JSON.stringify({type: "colorAssigned", color: randomColor}));

  ws.on('message', function incoming(data) {
    let message = JSON.parse(data);
    message.id = uuid.v4();

    if(message.type === 'post_message'){
      message.type = 'incoming_message';

    } else if (message.type === 'post_notification'){
      message.type = 'incoming_notification';
    }

    message = JSON.stringify(message);
    wss.broadcast(message);

    broadcast_client_count(wss.clients);
  });


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    broadcast_client_count(wss.clients);

  });
});