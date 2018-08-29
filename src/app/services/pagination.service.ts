import {Injectable} from '@angular/core';
import {User} from '../user';
import {GlobalService} from './global.service';

@Injectable({
    providedIn: 'root'
})
export class PaginationService {
    numberOfUsers: number;
    usersPerPage: number;
    from: string;
    to: string;
    numberOfPages: number;
    curentPage: number;
    users: User[];

    config(array: User[], usersPage: number, crt: number) {
        /* console.log(this.users.length);
        // this.users.length = array.length;
        console.log(this.users.length); */
        this.numberOfUsers = array.length;
        this.usersPerPage = usersPage;
        this.numberOfPages = Math.ceil(array.length / usersPage);
        this.curentPage = crt;
        console.log('num of users', this.numberOfUsers, 'users per page', this.usersPerPage,
            'pages', this.numberOfPages, 'crt', this.curentPage);
        for (let i = (crt - 1) * usersPage; i <= crt * usersPage - 1; i++) {
            // console.log(i, ' ');
            // console.log(this.globalService.arrayOfUsers[i]);
            /// console.log(this.users.length);
            // this.users.push(array[i]);
            // console.log(this.users[i]);
        }
    }

    constructor(private globalService: GlobalService) {
    }
}
