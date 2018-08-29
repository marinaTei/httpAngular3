import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {GlobalService} from '../services/global.service';
import {UserOpsService} from '../services/user-ops.service';
import {User} from '../user';
import {FormService} from '../services/form.service';
import {RequestService} from '../services/request.service';


declare let $: any;

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
    user = <User>{firstname: '', lastname: '', email: '', birthdate: '', active: null, permissions: {r: null, w: null, x: null}};
    userPut = <User>{firstname: '', lastname: '', email: '', birthdate: '', active: null, permissions: {r: null, w: null, x: null}};

    @ViewChild('modal') modalElem: ElementRef;

    show() {
        $(this.modalElem.nativeElement).modal('show');
    }

    hide() {
        $(this.modalElem.nativeElement).modal('hide');
    }


    constructor() {
    }

    ngOnInit() {
    }
}
