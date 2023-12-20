const io = require('socket.io')(8000)

const user = {};

io.on('connection',socket=>{

    socket.on('new-user-joined',user_name=>{
        console.log(user_name + " connected");
        user[socket.id] = user_name;
        socket.broadcast.emit('user-joined',user_name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive',{ message: message, user_name: user[socket.id]});
    });
});