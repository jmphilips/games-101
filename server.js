'use strict'

const express = require('express');
const socketio = require('socket.io');
const { Server } = require('http');
const mongoose = require('mongoose');

const app = express()
const server = Server(app);
const io = socketio(server);

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/tickytackytoe';

app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('index'));

mongoose.connect(MONGODB_URL, () => {
    server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
})

const Game = mongoose.model('game', {
    board: [
        [String, String, String],
        [String, String, String],
        [String, String, String]
    ]
})

io.on('connected', socket => {
    console.log(`Socket connected: ${socket.id}`);
    socket.on('disconnect', () => console.log('disconnected'));
})
