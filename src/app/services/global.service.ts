import { Injectable } from '@angular/core';
import {User} from '../user';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  show = false;
  value: string;
  id: string;
  user = new User();
  constructor() { }
}
