export class User {
    constructor(public id: string,
                public username: string = 'without-Name',
                public room: string = 'without-Room'
    ) {
    }
}
