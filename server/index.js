const io = require('socket.io')(8000)

const user = {};

io.on('connection',socket=>{

    socket.on('new-user-joined',user_name=>{
        user[socket.id] = user_name;
        socket.broadcast.emit('user-joined',user_name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive',{ message: message, user_name: user[socket.id]});
    });
    socket.on('disconnect',message =>{
        socket.broadcast.emit('left',user[socket.id]);
        delete user[socket.id];
    })
});