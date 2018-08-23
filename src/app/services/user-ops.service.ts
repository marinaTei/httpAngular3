import {Injectable} from '@angular/core';

import {RequestService} from './request.service';
import {User} from '../user';
import {GlobalService} from './global.service';

@Injectable({providedIn: 'root'})
export class UserOpsService {

    constructor(private req: RequestService, private globalService: GlobalService) {
    }

    deleteUser(id: string) {
        this.req.deleteUser(id)
            .subscribe(
                (data: void) => {
                    this.req.getAllUsers();
                },
                (err: any) => console.log(err)
            );
    }

    updateUser(user: User) {

        this.req.updateUser(user)
            .subscribe(
                (data: any) => {
                    this.req.getAllUsers();
                },
                (err: any) => console.log(err)
            );
    }

    postUser(user: User) {
        if (user.active === null) {
            user.active = false;
        }
        this.req.addUser(user)
            .subscribe(
                (data: any) => {
                    this.req.getAllUsers();
                },
                (err: any) => console.log(err),
                () => console.log('post')
            );
    }
}
