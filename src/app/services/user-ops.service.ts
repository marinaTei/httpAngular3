import { Injectable } from '@angular/core';

import { RequestService } from './request.service';
import { User } from '../user';

@Injectable({ providedIn: 'root'})
export class UserOpsService {

  constructor(private req: RequestService) { }

    async getUsers() {

        await this.req.getAllUsers()
            .subscribe(
                (data: any) => {
                    console.log(data.rows);
                    return data.rows;
                }
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

    async deleteUser(id: string) {
        await this.req.deleteUser(id)
            .subscribe(
                (data: void) => {},
                (err: any) => console.log(err)
            );
    }

    async updateUser(user: User) {

      await this.req.updateUser(user)
          .subscribe(
              (data: any) => {},
              (err: any) => console.log(err)
          );
    }

    async postUser(user: User) {
      await this.req.addUser(user)
          .subscribe(
              (data: any) => {},
              (err: any) => console.log(err)
          );
    }
}
