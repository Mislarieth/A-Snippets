/*
  Socket.io let's you do sockets in JS
*/

/*
  Standalone socket server
*/
var io = require('socket.io')(4500);

/*
  setup in hapi.js
*/
var server = new Hapi.Server();
server.connection({ port: 4000});

var io = require('socket.io')(server.listener);

/*
  socket.io does event things
  the following is generalized for every client

  socket.on is an event sent from client
*/
io.on('connection', function (socket) {
  io.emit('log_message', { message: 'New user joined!'});

  socket.on('private message', function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
  });

  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });
});

/*
  if you have multiple socket things, you can restrict to namespace for ease
  and reusability
*/
var chat = io.of('/chat')
  .on('connection', function (socket) {
    socket.emit('log_message', {
        message: 'You joined chat'
    });
    chat.emit('log_message', {
        message: 'A new user joined!'
    });
  });

var shop = io.of('/shop')
  .on('connection', function (socket) {
    socket.emit('item', { shop: 'item' });
  });

/*
  If you want to send UDP messages just use volatile
  pros: faster cons: user may or may not get it
*/
io.on('connection', function (socket) {
    socket.volatile.emit('log_message', "user may or may not receive this");
});

/*
  If you want to send to all but that socket, use broadcast
*/
io.on('connection', function (socket) {
  socket.broadcast.emit('log_message', { message: 'New user joined!'});
});
