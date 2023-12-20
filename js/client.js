const socket = io('http://localhost:8000')

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messsageContainer = document.querySelector(".container")

var audio = new Audio('server/ting.mp3')

const uname = prompt("Enter your name to join");
socket.emit('new-user-joined',uname);

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value = '';
});

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messsageContainer.append(messageElement);
    if (position=='left') {    
        audio.play();
    }
}

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'left')
});

socket.on('receive',data=>{
    append(`${data.user_name}: ${data.message}`,'left')
});

socket.on('left',user_name=>{
    append(`${user_name} left the chat`,'left')
});