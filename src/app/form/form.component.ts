import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../services/global.service';
import {UserOpsService} from '../services/user-ops.service';
import {User} from '../user';
import {FormService} from '../services/form.service';
import {RequestService} from '../services/request.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
    user = <User>{firstname: '', lastname: '', email: '', birthdate: '', active: null, permissions: {r: null, w: null, x: null}};
    userPut = <User>{firstname: '', lastname: '', email: '', birthdate: '', active: null, permissions: {r: null, w: null, x: null}};

    constructUser(attr: string, val: any) {
         if (attr === 'r' || attr === 'w' || attr === 'x') {
             this.global.user.permissions[attr] = val;
        } else {
            this.global.user[attr] = val;
        }
    }

    constructor(private global: GlobalService, private op: UserOpsService, private form: FormService,
                private requestService: RequestService) {
    }

    close() {
        this.userPut = <User>
            {firstname: '', lastname: '', email: '', birthdate: '', active: null, permissions: {r: null, w: null, x: null}};
        // this.userPut.permissions.r = null;
        // this.userPut.permissions.x = null;
        // this.userPut.permissions.w = null;
        // this.userPut.active = null;
        this.userPut.firstname = '';
        console.log('close');
        this.global.show = !this.global.show;
    }

    deleteYes() {
        this.requestService.deleteUser(this.global.id)
            .subscribe(
                (data: any) => {console.log('delete'); }
            );
        this.requestService.getAllUsers()
            .subscribe(
                (data: any) => {
                    // console.log(data.rows);
                    this.global.arrayOfUsers = Object.keys(data.rows).map(it => data.rows[it]);
                    console.log(this.global.arrayOfUsers);
                },
                (err: any) => {
                    console.log(err);
                },
                () => {
                    console.log('get');
                }
            );
        this.close();
    }

    save() {
        if (this.global.value === 'put') {
            this.requestService.updateUser(this.global.user)
                .subscribe(
                    (data: any) => {console.log('update'); }
                );
        }
        if (this.global.value === 'post') {
            this.requestService.addUser(this.global.user)
                .subscribe(
                    (data: any) => {console.log('post'); }
                );
        }
        this.requestService.getAllUsers()
            .subscribe(
                (data: any) => {
                    this.global.arrayOfUsers = Object.keys(data.rows).map(it => data.rows[it]);
                    console.log(this.global.arrayOfUsers);
                },
                (err: any) => {
                    console.log(err);
                },
                () => {
                    console.log('get');
                }
            );
        this.close();
    }

    getShow(): boolean {
        if (this.getValue() === 'put') {
            this.userPut = this.form.localUser;
            (!this.userPut.active) ? this.userPut.active = null : this.userPut.active = true;
            (!this.userPut.permissions.r) ? this.userPut.permissions.r = null : this.userPut.permissions.r = true;
            (!this.userPut.permissions.w) ? this.userPut.permissions.w = null : this.userPut.permissions.w = true;
            (!this.userPut.permissions.x) ? this.userPut.permissions.x = null : this.userPut.permissions.x = true;
        } else if (this.getValue() === 'post') {
            this.userPut = <User>
                {firstname: '', lastname: '', email: '', birthdate: '', active: null, permissions: {r: null, w: null, x: null}};
        }
        return this.global.show;
    }

    getValue(): string {
        return this.global.value;
    }

    ngOnInit() {
    }
}
