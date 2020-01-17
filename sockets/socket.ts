import {Socket} from 'socket.io';
import socketIO from 'socket.io';
import {usersList} from '../classes/users-list';
import {User} from "../classes/user";

export const connectedUsers = new usersList();
export const connectClient = (client: Socket, io: socketIO.Server) => {
    const user = new User(client.id);
    connectedUsers.addUser(user);
};


export const disconnect = (client: Socket, io: socketIO.Server) => {
    client.on('disconnect', () => {
        console.log('Client disconnected!');
        connectedUsers.deleteUser(client.id);
        io.emit('actives-users', connectedUsers.getUsersList());
    })
};
export const messageListener = (client: Socket, io: socketIO.Server) => {
    client.on('message', (payload: { from: string, body: string }) => {
        console.log('message received ', payload);
        io.emit('new-message', payload);
    })
};
export const configUser = (client: Socket, io: socketIO.Server) => {
    client.on('config-user', (payload: { name: string }, callback: (resp?: any) => any) => {

        connectedUsers.updateUsername(client.id, payload.name);
        io.emit('actives-users', connectedUsers.getUsersList());
        callback({
            ok: true,
            message: `${payload.name}, configured`
        });
    })
};


// get Users
export const getUsers = (client: Socket, io: socketIO.Server) => {
    client.on('get-users', () => {
        io.to(client.id).emit('actives-users', connectedUsers.getUsersList());
    })
};
