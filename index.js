const express = require('express');
const http = require('http');
const socketIO = require('socket.io');



const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Bir kullanıcı bağlandı');

    // Kullanıcıdan gelen mesajları dinle
    socket.on('chat message', (msg) => {
        console.log('Mesaj alındı:', msg);

        // Tüm bağlı istemcilere mesajı ileti
        io.emit('chat message', msg);
    });

    // Kullanıcı ayrıldığında olayı işle
    socket.on('disconnect', () => {
        console.log('Bir kullanıcı ayrıldı');
    });
});

const PORT = process.env.PORT || 3000;
const IP_ADDRESS = '0.0.0.0'; // ya da kendi IP adresinizi kullanabilirsiniz

server.listen(PORT, IP_ADDRESS, () => {
    console.log(`Sunucu ${IP_ADDRESS}:${PORT} adresinde çalışıyor`);
});