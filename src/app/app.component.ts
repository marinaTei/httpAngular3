import { Component } from '@angular/core';
import {THIS_EXPR} from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Users App';
  show = false;
  value: string;
  changeValue() {
    this.show = !this.show;
  }
}
