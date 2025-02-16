import {Server} from 'socket.io'
import {User} from '../src/models/user.model.js';
import {Captian} from '../src/models/captian.model.js';

let io;

export function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: process.env.CORS_ORIGIN,
            methods: ["GET", "POST"],
        },
    });

    io.on('connection', (socket) => {
        console.log('New client connected', socket.id);

        socket.on('join', async (data) => {
            const {userId, userType} = data;

            if(userType === 'user') {
                const user = await User.findByIdAndUpdate(userId, {
                    socketId: socket.id
                })
            } else if( userType === 'captian') {
                await Captian.findByIdAndUpdate(userId, {
                   socketId: socket.id
                })
            }
        });

        socket.on('update-location-captian', async (data) => {
            const {userId, location} = data;

            if(!location) {
                socket.emit('error', {message: 'Invalid location'})
            }

            await Captian.findByIdAndUpdate(userId, {
                location: {
                    lat: location.lat,
                    lng: location.lng
                }
            })
        })

        socket.on('disconnect', () => {
            console.log('Connection closed', socket.id)
        })
    });
}

export function sendMessagetoSocketId(socketId, message) {
    if(io) {
        io.to(socketId).emit('message', message);
    } else {
        console.log('Socket.io server is not initialized');
    }
}