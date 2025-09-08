// Nama file: server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 3000;

app.use(express.static('public')); // Menyajikan file HTML, CSS, JS dari folder 'public'

io.on('connection', (socket) => {
    console.log('Pengguna terhubung:', socket.id);

    // Menerima pesan teks dari client
    socket.on('chat message', (msg) => {
        console.log('Pesan diterima:', msg);
        io.emit('chat message', msg); // Kirim pesan ke semua client
    });

    // Menerima pesan gambar (dalam bentuk data base64) dari client
    socket.on('image message', (data) => {
        console.log('Gambar diterima');
        // Di sini seharusnya ada logika untuk menyimpan gambar ke storage
        // Untuk contoh ini, kita langsung kirim ke semua client
        io.emit('image message', data);
    });

    // Menerima pesan reply
    socket.on('reply message', (data) => {
        console.log('Reply diterima:', data.replyTo, '->', data.message);
        io.emit('reply message', data); // Kirim reply ke semua client
    });

    socket.on('disconnect', () => {
        console.log('Pengguna terputus:', socket.id);
    });
});

server.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
