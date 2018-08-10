import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../user';

@Injectable({providedIn: 'root'})
export class RequestService {

    constructor(private http: HttpClient) { }

     getAllUsers(): Observable<User[]> {
        console.log('Getting all Users from the server.');
        return this.http.get<User[]>('/table/users');
    }

/*    getUserById(id: string): Observable<User> {
        return this.http.get<User>(`/table/users/${id}`, {
            headers: new HttpHeaders({
                'Accept': 'application/json',
            })
        });
    }*/

    addUser(newUser: User): Observable<User> {
        return this.http.post<User>('/table/create/user', newUser, {
        });
    }

    updateUser(updatedUser: User): Observable<void> {
        return this.http.put<void>(`/table/update/user/${updatedUser.id}`, updatedUser, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    deleteUser(id: string): Observable<void> {
        return this.http.delete<void>(`/table/delete/user/${id}`);
    }

}
