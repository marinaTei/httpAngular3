import { Injectable } from '@angular/core';
import {User} from '../user';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  show = false;
  value: string;
  id: string;
  user = <User>{firstname: '', lastname: '', email: '', birthdate: '', active: null, permissions: {r: false, w: false, x: false}};
  search: string;

    constructor() { }
}

