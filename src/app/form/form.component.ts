import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../services/global.service';
import {UserOpsService} from '../services/user-ops.service';
import {User} from '../user';
import {FormService} from '../services/form.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
    // perm: Permission;
    user = <User>{firstname: '', lastname: '', email: '', birthdate: '', active: false, permissions: {r: false, w: false, x: false}};
    userPut = <User>{firstname: '', lastname: '', email: '', birthdate: '', active: false, permissions: {r: false, w: false, x: false}};

    constructUser(attr: string, val: any) {
         if (attr === 'r' || attr === 'w' || attr === 'x') {
             this.user.permissions[attr] = val;
        } else {
            this.user[attr] = val;
        }
    }

    constructor(private global: GlobalService, private op: UserOpsService, private form: FormService) {
    }

    close() {
        console.log('close');
        this.global.show = !this.global.show;
    }

    async deleteYes() {
        await this.op.deleteUser(this.global.id);
        this.op.getUsers();
        this.close();
    }

    async save() {
        if (this.global.value === 'put') {
            this.user.id = this.global.id;
            await this.op.updateUser(this.user);
        }
        if (this.global.value === 'post') {
            await this.op.postUser(this.user);
        }
        // this.emptyForm();
        this.close();
    }
    /*emptyForm(){
        this.userPut.permissions.r = false;
        this.user.permissions.r = false;
    }*/

    getShow(): boolean {
        if (this.getValue() === 'put') { this.userPut = this.form.localUser; }
        return this.global.show;
    }

    getValue(): string {
        return this.global.value;
    }

    ngOnInit() {
        // this.userPut.permissions.r = false;
        // '', lastname: '', email: '', birthdate: '', active: false, permissions: {r: false, w: false, x: false}};
    }
}
