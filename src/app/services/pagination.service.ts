import { Injectable } from '@angular/core';
import {User} from '../user';

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
  paginationUsers: User[];

  config(numOfUsers: number, usersPage: number) {
      this.numberOfUsers = numOfUsers;
      this.usersPerPage = usersPage;
      this.numberOfPages = numOfUsers / usersPage;
      numOfUsers % usersPage ? this.numberOfPages++ : console.log(this.numberOfPages);
      this.curentPage = 1;
  }

  constructor() { }
}
