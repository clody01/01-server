import {User} from "./user";

export class usersList {
    private list: User[] = [];

    constructor() {
    }


    // Adding one user
    public addUser(user: User) {
        this.list.push(user);
        console.log(this.list);
        return user;
    }

    public updateUsername(id: string, name: string) {
        for (let user of this.list) {
            if (user.id === id) {
                user.username = name;
                break;
            }
        }
        console.log('===== Updating User =====');
        console.log(this.list);
    }

    public getUsersList() {
        return this.list.filter(user => user.username !== 'without-Name');
    }

    public getUser(id: string) {
        return this.list.find(user => user.id === id);
    }

    // Get all users in a specific room
    public getUserInRoom(room: string) {
        return this.list.filter(user => user.room === room);
    }
    // Delete User
    public deleteUser(id: string) {
        const tempUser = this.getUser(id);
        this.list =  this.list.filter(user => user.id !== id);
        return tempUser;
    }
}
