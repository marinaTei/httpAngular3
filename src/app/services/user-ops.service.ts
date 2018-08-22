import {Injectable} from '@angular/core';

import {RequestService} from './request.service';
import {User} from '../user';

@Injectable({ providedIn: 'root'})
export class UserOpsService {

  constructor(private req: RequestService) { }

    getUsers() {

        this.req.getAllUsers()
            .subscribe(
                (data: any) => {
                    console.log(data.rows);
                    return data.rows;
                },
                (err: any) => { console.log(err); },
                () => { console.log('completed'); }
            );
    }
/*     async getUserById(id: string) {

         await this.req.getUserById(id)
            .subscribe(
                (data: any) => {
                    this.userAux = data.valueOf();
                }
            );
    }*/

    deleteUser(id: string) {
        this.req.deleteUser(id)
            .subscribe(
                (data: void) => { this.req.getAllUsers(); },
                (err: any) => console.log(err)
            );
    }

    updateUser(user: User) {

      this.req.updateUser(user)
          .subscribe(
              (data: any) => { this.req.getAllUsers(); },
              (err: any) => console.log(err)
          );
    }

    postUser(user: User) {
      this.req.addUser(user)
          .subscribe(
              (data: any) => { this.req.getAllUsers(); },
              (err: any) => console.log(err)
          );
    }
}
