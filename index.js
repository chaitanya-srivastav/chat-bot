var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('person', function(person){
    socket.broadcast.emit('newConnection', {name: person});
  });
  socket.on('chat message', function(data){
    socket.broadcast.emit('chat message', data);
  });
  socket.on('isTyping', function(data){
    socket.broadcast.emit('isTyping', data);
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
