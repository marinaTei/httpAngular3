import { Injectable } from '@angular/core';
import {RequestService} from './request.service';
import {User} from '../user';
import {async} from 'rxjs/internal/scheduler/async';

@Injectable({
  providedIn: 'root'
})
export class UserOpsService {

  constructor(private req: RequestService) { }

    async deleteUser(id: string) {
        await this.req.deleteUser(id)
            .subscribe(
                (data: void) => { },
                (err: any) => console.log(err)
            );
    }

    async updateUser(id: string) {

      const user = new User();
      await this.req.updateUser(user)
          .subscribe(
              (data: any) => {},
              (err: any) => console.log(err)
          );
    }
}
