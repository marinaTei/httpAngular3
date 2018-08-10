import { Injectable } from '@angular/core';
import {User} from '../user';
import {Permission} from '../permission';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  show = false;
  value: string;
  id: string;
  user = <User>{firstname: '', lastname: '', email: '', birthdate: '', active: false}; // ,
      // permissions: <Permission>{read: false, write: false, execute: false}};

    constructor() { }
}
