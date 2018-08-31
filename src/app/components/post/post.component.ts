import {Component, OnInit} from '@angular/core';
import {FormService} from '../../services/form.service';


@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
    showText: boolean;
    filesNames: string[];

    constructor(public formService: FormService) {
    }

    ngOnInit() {
        this.showText = true;
    }

    constructUser(attr: string, val: any) {
        if (attr === 'r' || attr === 'w' || attr === 'x') {
            this.formService.userPost.permissions[attr] = val;
        } else {
            this.formService.userPost[attr] = val;
        }
    }

    testBrowse(files: FileList) {
        console.log(FileList);
        for (let i = 0; i < files.length; i++) {
            if (files.item(i).type !== ('text/plain' || 'application/json')) {
                console.log('danger');
                this.formService.displayAlert('Please add only .txt or .json files!');
            }
        }
    }
    hide(type: string) {
        this.formService.hideAlert(type);
    }
/*
    checkType(files: FileList) {
        if (files.length > 0 && this.formService.alert === true) {
            this.formService.aler = false;
        }
    }*/

}
