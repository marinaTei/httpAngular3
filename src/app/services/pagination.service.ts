import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  numberOfUsers: number;
  usersPerPage: number;
  from: string;
  to: string;
  visibility = [true, false];

  update (all: number, perPage: number, idStart: string, idEnd: string, pos: number) {
    this.visibility.length = all;
    this.numberOfUsers = all;
    this.usersPerPage = perPage;
    this.from = idStart;
    this.to = idEnd;
      console.log('before for');
    for (let i = 0; i < pos; i++) {
        console.log(this.visibility[0]);
          this.visibility[0] = false;
      }
    for (let i = pos; i <= perPage; i++) {
        console.log(this.visibility[1]);
          this.visibility[1] = true;
      }
      for (let i = pos + perPage; i < all; i++) {
          console.log(this.visibility[2]);
          this.visibility[2] = false;
      }
}

  constructor() { }
}
