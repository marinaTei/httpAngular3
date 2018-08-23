import {Component, Input, OnInit} from '@angular/core';

import {RequestService} from '../services/request.service';
import {UserOpsService} from '../services/user-ops.service';
import {FormService} from '../services/form.service';
import {GlobalService} from '../services/global.service';

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
    globalAllUsers: User[];
    p = 1;
    // searchText = this.globalVar.search;

    constructor(private dataService: RequestService, private op: UserOpsService,
                private form: FormService, private globalVar: GlobalService,
                private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.getUsers();
        this.pencil = this.sanitizer.bypassSecurityTrustHtml(pencil.toSVG());
        this.eye = this.sanitizer.bypassSecurityTrustHtml(eye.toSVG());
        this.tools = this.sanitizer.bypassSecurityTrustHtml(tools.toSVG());
    }

    toBool(aux: any): string {
        if (aux === 'true' || aux === true) { return 'active'; } else if (aux === 'false' || aux === false) { return 'inactive'; }
    }

    search(text: string) {
        text = text.toLocaleLowerCase();
        console.log(text);
        console.log(this.globalAllUsers);
        this.allUsers = this.globalAllUsers.filter( user => {
            console.log(user.active);
            if (user.firstname.toString().toLowerCase().includes(text.toString()) ||
                user.lastname.toString().toLowerCase().includes(text) ||
                user.email.toString().toLowerCase().includes(text) ||
                user.id.toString().toLowerCase().includes(text.toString()) ||
                this.toBool(user.active).includes(text)) {
                return user;
            }
        });
    }

    getUsers() {
        this.dataService.getAllUsers()
            .subscribe(
                (data: any) => {
                    this.allUsers = Object.keys(data.rows).map(it => data.rows[it]);
                    this.globalAllUsers = this.allUsers;
                    console.log(data.rows);
                }
            );
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

    sort(n: number) {
        let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById('table');
        switching = true;
        dir = 'asc';
        while (switching) {
            switching = false;
            rows = table.rows;
            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName('TD')[n];
                y = rows[i + 1].getElementsByTagName('TD')[n];
                if (dir === 'asc') {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir === 'desc') {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount ++;
            } else {
                if (switchcount === 0 && dir === 'asc') {
                    dir = 'desc';
                    switching = true;
                }
            }
        }
    }
}

