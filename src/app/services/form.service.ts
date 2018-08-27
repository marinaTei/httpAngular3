import {Injectable} from '@angular/core';
import {User} from '../user';

@Injectable({
    providedIn: 'root'
})
export class FormService {

    localUser = <User>{firstname: '', lastname: '', email: '', birthdate: '', active: false, permissions: {r: false, w: false, x: false}};

    constructor() {
    }

    passUser(user: User) {
        console.log(user.id, 'passUser()');
        this.localUser = user;
    }
}

