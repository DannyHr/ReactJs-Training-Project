var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var request = require('request');
var recaptchaSecret = '6LcMbDcUAAAAAFOLQo61Ki1A0yB8QjZZUJkE_5fR';

var port = 8002;

// unsafe - all files are accessible
app.use('/', express.static(__dirname));

app.get('/verify-recaptcha', function (req, res) {
    var userResponse = req.query.response;
    var config = {
        url: 'https://www.google.com/recaptcha/api/siteverify',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'secret': recaptchaSecret,
            'response': userResponse
        }
    };

    request(config, function (error, response) {
        // console.log(response);
        res.status(response.statusCode).send(response.body);
        return;
    });
})

//socket.io
io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('joinroom', function (data) {
        console.log('user joined a room (' + data.roomId + ')');
        socket.join(data.roomId);
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('item_removed', function (data) {
        var roomId = data.roomId;
        var itemId = data.itemId;

        socket.to(roomId).emit('item_removed', itemId);
        console.log('Room: ' + roomId + ' - Removed item with id: ' + itemId);
    });

    socket.on('item_added', function (data) {
        var roomId = data.roomId;
        var item = data.item;

        socket.to(roomId).emit('item_added', item);
        console.log('Room: ' + roomId + ' - Added item with name ' + item.name + ' and id ' + item.id);
    });
});

http.listen(port, function () {
    console.log('listening on *:' + port);
});