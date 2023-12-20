const socket = io('http://localhost:8000')


const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messsageContainer = document.querySelector(".container")


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value = '';
});


const uname = prompt("Enter your name to join");
socket.emit('new-user-joined',uname);

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messsageContainer.append(messageElement);
}

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right')
});

socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left')
});

