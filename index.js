var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = 8002;

//http
// unsafe - all files are accessible
app.use('/', express.static(__dirname));

//socket.io
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('item_removed', function (id) {
        console.log('Item removed: ' + id);
        io.emit('item_removed', id);
    });

    socket.on('item_added', function (item) {
        console.log('Item added: ' + item.name + '; id: ' + item.id);
        io.emit('item_added', item);
    });
});

http.listen(port, function () {
    console.log('listening on *:' + port);
});