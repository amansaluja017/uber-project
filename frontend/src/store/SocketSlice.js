import { createSlice } from "@reduxjs/toolkit";
import socket from "../services/Socket.service.js";

const initialState = {
    isConnected: false,
    messages: [],
}

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        connect(state) {
            state.isConnected = true;
            socket.connect();
        },
        disconnect(state) {
            state.isConnected = false;
            socket.disconnect();
        },
        receiveMessage(state, action) {
            state.messages.push(action.payload);
        }
    }
});

export const { connect, disconnect, receiveMessage } = socketSlice.actions;

export default socketSlice.reducer;

export const connectSocket = (dispatch) => {
    if(!socket.connected) {
        socket.connect();
    }

    socket.removeAllListeners('connect');
    socket.removeAllListeners('disconnect');
    socket.removeAllListeners('message');

    socket.on('connect', () => {
        console.log('Connected to the server');
        dispatch(connect());
    });

    socket.on('message', (message) => {
        console.log('message received')
        dispatch(receiveMessage(message));
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from the server');
        dispatch(disconnect());
    });
};

export const disconnectSocket = (dispatch) => {
    socket.disconnect();

    socket.on('disconnect', () => {
        console.log('Disconnected from the server');
        dispatch(disconnect());
    });
}

export const sendMessage = (message) => {
    socket.emit('join', message);
};