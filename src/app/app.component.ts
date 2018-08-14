import {Component} from '@angular/core';
import {NgxPaginationModule} from 'node_modules/ngx-pagination';

import {GlobalService} from './services/global.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Users App';

    constructor(private global: GlobalService) {
    }
    search(value: any) {
        console.log(value);
        this.global.search = value;
    }
    changeValue() {

        if (this.global.show === true) {
            alert('Close without deleting user?');
        }
        this.global.value = 'post';
        this.global.show = !this.global.show;
        this.global.user.active = null;
    }
}
