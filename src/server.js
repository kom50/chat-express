import express from 'express'
import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url'

import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server)
const PORT = 8080

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

/* Start */

io.on('connection', (socket) => {
    console.log('a user connected', socket.id)

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('user msg', msg);
        io.emit('chat message', msg);
    });
})


/* End */
server.listen(PORT, () => {
    console.log("Server running at %d port", PORT)
})