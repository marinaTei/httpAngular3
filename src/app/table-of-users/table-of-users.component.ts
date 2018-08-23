import {Component, Input, OnInit} from '@angular/core';

import {RequestService} from '../services/request.service';
import {UserOpsService} from '../services/user-ops.service';
import {FormService} from '../services/form.service';
import {GlobalService} from '../services/global.service';
import {PaginationService} from '../services/pagination.service';

import {User} from '../user';

import {eye, pencil, tools} from 'octicons';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
    selector: 'app-table-of-users',
    templateUrl: './table-of-users.component.html',
    styleUrls: ['./table-of-users.component.css']
})

export class TableOfUsersComponent implements OnInit {
    @Input() searchText: string;
    public pencil: SafeHtml;
    public eye: SafeHtml;
    public tools: SafeHtml;
    allUsers: User[];

    constructor(private dataService: RequestService, private op: UserOpsService,
                private form: FormService, public globalVar: GlobalService,
                private sanitizer: DomSanitizer, public paginationService: PaginationService) {
    }

    ngOnInit() {
        this.getUsers();
        this.pencil = this.sanitizer.bypassSecurityTrustHtml(pencil.toSVG());
        this.eye = this.sanitizer.bypassSecurityTrustHtml(eye.toSVG());
        this.tools = this.sanitizer.bypassSecurityTrustHtml(tools.toSVG());
    }

    displayUsers() {
        console.log('before for');
        this.globalVar.arrayOfUsers.
        for (let i = 0; i < this.paginationService.numberOfUsers; i++) {
            if (this.paginationService.visibility[i]) {
                console.log('before push');
                this.globalVar.arrayOfUsers.push(this.allUsers[i]);
            }
        }
    }

    getUsers() {

        this.dataService.getAllUsers()
            .subscribe(
                (data: any) => {
                    this.allUsers = Object.keys(data.rows).map(it => data.rows[it]);
                    this.globalVar.arrayOfUsers = this.allUsers;
                    console.log('before update');
                    this.paginationService.update(this.allUsers.length, 5, this.allUsers[0].id,
                        this.allUsers[4].id, 0);
                    console.log('before display');
                    this.displayUsers();
                    console.log(this.allUsers);
                    console.log(this.paginationService.numberOfUsers);
                }
            );
    }

    toBool(aux: any): string {
        if (aux === 'true' || aux === true) { return 'active'; } else if (aux === 'false' || aux === false) { return 'inactive'; }
    }

    search(text: string) {
        text = text.toLocaleLowerCase();
        this.globalVar.arrayOfUsers = this.allUsers.filter( user => {
            if (user.firstname.toString().toLowerCase().includes(text.toString()) ||
                user.lastname.toString().toLowerCase().includes(text) ||
                user.email.toString().toLowerCase().includes(text) ||
                user.id.toString().toLowerCase().includes(text.toString()) ||
                this.toBool(user.active).includes(text)) {
                return user;
            }
            this.displayUsers();
        });
    }
    changeToPost() {

        if (this.globalVar.show === true) {
            alert('Close without deleting user?');
        }
        this.globalVar.value = 'post';
        this.globalVar.show = !this.globalVar.show;
        this.globalVar.user.active = null;
    }

    open(user: User) {
        if (this.globalVar.show === true) { alert('Close without saving?'); }
        this.globalVar.id = user.id;
        this.globalVar.show = !this.globalVar.show;
    }

    changeToDelete(user: User) {
        this.globalVar.value = 'del';
        this.open(user);
    }

    changeToPut(user: User) {
        this.form.passUser(user);
        this.globalVar.value = 'put';
        this.open(user);
    }
    sortTest(key: string) {
        this.globalVar.arrayOfUsers.sort(function(user1: User, user2: User): number {
            let x = user1[key].toLowerCase();
            let y = user2[key].toLowerCase();
            if (key === 'id') {
                x = +x.slice(3);
                y = +y.slice(3);
            }
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
}
