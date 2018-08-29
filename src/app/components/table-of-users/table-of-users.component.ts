import {Component, Input, OnInit, AfterViewInit, ViewChild} from '@angular/core';

import {RequestService} from '../../services/request.service';
import {FormService} from '../../services/form.service';
import {GlobalService} from '../../services/global.service';
import {PaginationService} from '../../services/pagination.service';

import {User} from '../../user';

import {eye, pencil, tools} from 'octicons';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {FormComponent} from '../form/form.component';


@Component({
    selector: 'app-table-of-users',
    templateUrl: './table-of-users.component.html',
    styleUrls: ['./table-of-users.component.css']
})

export class TableOfUsersComponent implements OnInit {
    @Input() searchText: string;
    @ViewChild('modalPOST') modalPOST: FormComponent;
    @ViewChild('modalPUT') modalPUT: FormComponent;
    @ViewChild('modalDEL') modalDEL: FormComponent;
    public pencil: SafeHtml;
    public eye: SafeHtml;
    public tools: SafeHtml;
    allUsers: User[];
    visibility = [];

    constructor(private requestService: RequestService, public formService: FormService,
                public globalService: GlobalService, private sanitizer: DomSanitizer,
                public paginationService: PaginationService) {
    }

    ngOnInit() {
        this.getUsers();
        this.pencil = this.sanitizer.bypassSecurityTrustHtml(pencil.toSVG());
        this.eye = this.sanitizer.bypassSecurityTrustHtml(eye.toSVG());
        this.tools = this.sanitizer.bypassSecurityTrustHtml(tools.toSVG());
    }

    displayUsers() {
        console.log(this.allUsers);
        this.paginationService.config(this.allUsers, 5, 1);
        for (let i = 0; i <= 5; i++) {
            this.visibility[i].state = true;
        }
    }

    /* check(user: User) {
        console.log('check');
        for (let i = 0; i <= this.globalService.arrayOfUsers.length; i++) {
            if (user.id === this.visibility[i].id) {
                if ( this.visibility[i].state === true) { return true; } else { return false; }
            }
        }
    }*/

    getUsers() {

        this.requestService.getAllUsers()
            .subscribe(
                (data: any) => {
                    // const aux =  Object.keys(data.rows).map(it => data.rows[it]);
                    // for (let i = 0; i <= this.allUsers.length; i++) {
                    //     this.visibility.push(
                    //         {id: aux[i].id,
                    //             state: false}
                    //     );
                    //     console.log(aux);

                    this.allUsers = Object.keys(data.rows).map(it => data.rows[it]);
                    this.globalService.arrayOfUsers = this.allUsers;
                    console.log(this.globalService.arrayOfUsers);
                    // this.displayUsers();
                }
            );
    }

    toBool(aux: any): string {
        if (aux === 'true' || aux === true) {
            return 'active';
        } else if (aux === 'false' || aux === false || aux === null) {
            return 'inactive';
        } else {
            console.log(aux);
        }
    }

    refreshUsers(input: string) {
        if (!input) {
            this.allUsers = this.globalService.arrayOfUsers;
        }
    }

    search(text: string) {
        text = text.toLocaleLowerCase();
        this.globalService.arrayOfUsers = this.allUsers.filter(user => {
            if (user.firstname.toString().toLowerCase().includes(text.toString()) ||
                user.lastname.toString().toLowerCase().includes(text) ||
                user.email.toString().toLowerCase().includes(text) ||
                user.id.toString().toLowerCase().includes(text.toString()) ||
                this.toBool(user.active).startsWith(text)) {
                return user;
            }
            // this.displayUsers();
        });
    }

    changeToPost() {
        this.modalPOST.show();

    }

    saveUser() {
        console.log(this.formService.userPost);
        this.formService.add();
        this.modalPOST.hide();
    }

    changeToDelete(id: string) {
        this.modalDEL.show();
        this.formService.idDel = id;
    }

    deleteYes() {
        this.formService.delete();
        this.modalDEL.hide();
    }

    deleteNo() {
        this.modalDEL.hide();
    }

    changeToPut(user: User) {
        this.formService.userPut = user;
        (!this.formService.userPut.active) ? this.formService.userPut.active = null : this.formService.userPut.active = true;
        (!this.formService.userPut.permissions.r) ?
            this.formService.userPut.permissions.r = null : this.formService.userPut.permissions.r = true;
        (!this.formService.userPut.permissions.w) ?
            this.formService.userPut.permissions.w = null : this.formService.userPut.permissions.w = true;
        (!this.formService.userPut.permissions.x) ?
            this.formService.userPut.permissions.x = null : this.formService.userPut.permissions.x = true;
        this.modalPUT.show();
        console.log(user.id, 'changeToPut()');
    }

    changeUser() {
        console.log(this.formService.userPut);
        this.formService.update();
        this.modalPUT.hide();
    }


    sortTest(key: string) {
        this.globalService.arrayOfUsers.sort(function (user1: User, user2: User): number {
            console.log(key);
            let x = user1[key].toLowerCase();
            let y = user2[key].toLowerCase();
            if (key === 'id') {
                x = +x.slice(3);
                y = +y.slice(3);
            }
            console.log(x, y);
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
}
