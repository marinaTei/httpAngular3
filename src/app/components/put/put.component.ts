import {Component, OnInit} from '@angular/core';
import {FormService} from '../../services/form.service';

@Component({
    selector: 'app-put',
    templateUrl: './put.component.html',
    styleUrls: ['./put.component.css']
})
export class PutComponent implements OnInit {

    constructor(public formService: FormService) {
    }

    ngOnInit() {
    }

    constructUser(attr: string, val: any) {
        if (attr === 'r' || attr === 'w' || attr === 'x') {
            this.formService.userPut.permissions[attr] = val;
        } else {
            this.formService.userPut[attr] = val;
        }
    }

}
