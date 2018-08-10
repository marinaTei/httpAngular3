import {Component} from '@angular/core';

import {GlobalService} from './services/global.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    title = 'Users App';

    constructor(private global: GlobalService) {
    }

    changeValue() {
        if (this.global.show === true) {
            alert('Close without deleting user?');
        }
        this.global.value = 'post';
        this.global.show = !this.global.show;
    }
}
