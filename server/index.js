const express = require('express');
const http = require('http');
const io = require('socket.io')(8000)
const cors = require('cors')

const app = express();
app.use(cors());

const server = http.createServer(app);

const user = {};

PORT = 5500;

io.on('connection', socket => {

    socket.on('new-user-joined',user_name=>{
        console.log(user_name + " connected");
        user[socket.id] = user_name;
        socket.broadcast.emit('user-joined',user_name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, user_name: user[socket.id]});
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

