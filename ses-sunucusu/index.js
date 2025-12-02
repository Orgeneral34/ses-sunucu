const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: { origin: "*" } // Her yerden erişime izin ver
});

// HTML dosyasını sun
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Bir kullanıcı bağlandı: ' + socket.id);

    // Telefondan/PC'den gelen ses verisini al
    socket.on('audio-stream', (data) => {
        // Web sitesine (diğer herkese) gönder
        socket.broadcast.emit('play-audio', data);
    });

    socket.on('disconnect', () => {
        console.log('Kullanıcı ayrıldı');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Sunucu çalışıyor: Port ${PORT}`);
});
