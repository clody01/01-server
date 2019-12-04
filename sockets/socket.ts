import {Socket} from 'socket.io';
import socketIO from 'socket.io';
import {usersList} from '../classes/users-list';
import {User} from "../classes/user";

export const connectedUsers = new usersList();
export const connectClient = (client: Socket) => {
    const user = new User(client.id);
    connectedUsers.addUser(user);
};


export const disconnect = (client: Socket) => {
    client.on('disconnect', () => {
        console.log('Client disconnected!');
        connectedUsers.deleteUser(client.id);
    })
};
export const messageListener = (client: Socket, io: socketIO.Server) => {
    client.on('message', (payload: { from: string, body: string }) => {
        console.log('message received ', payload);
        io.emit('new-message', payload);
    })
};
export const configUser = (client: Socket, io: socketIO.Server) => {
    client.on('config-user', (payload: { name: string }, callback: Function) => {
        connectedUsers.updateUsername(client.id, payload.name);
        callback({
            ok: true,
            message: `${payload.name}, configured`
        });
    })
};
