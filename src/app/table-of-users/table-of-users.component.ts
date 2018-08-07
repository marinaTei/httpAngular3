import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { RequestService } from '../services/request.service';
import { UserOpsService } from '../services/user-ops.service';
import { FormService } from '../services/form.service';

@Component({
    selector: 'app-table-of-users',
    templateUrl: './table-of-users.component.html',
    styles: []
})
export class TableOfUsersComponent implements OnInit {

    allUsers: User[];

    ngOnInit() {
        this.getUsers();
    }

    constructor(private dataService: RequestService, private op: UserOpsService, private form: FormService) {
    }

    async getUsers() {
        await this.dataService.getAllUsers()
            .subscribe(
                (data: any) => {
                    this.allUsers = Object.keys(data.rows).map(it => data.rows[it]);
                }
            );
    }
    async deleteUserbyID(id: string) {

        await this.op.deleteUser(id);
        await this.getUsers();
    }

    async editUser(id: string) {
        await this.op.updateUser(id);
    }
/*
    async deleteUserbyID() {
        await this.op.deleteUser();
    }
*/
}
/*
    deleteUser(id: string): void {
        this.dataService.deleteUser(id)
            .subscribe(
                (data: void) => {
                    this.allUsers = this.modal.getUsers();
                },
                (err: any) => console.log(err)
            );
    }*/
