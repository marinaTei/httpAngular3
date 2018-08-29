import { Component, OnInit } from '@angular/core';
import {FormService} from '../../services/form.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(public formService: FormService) { }

  ngOnInit() {
  }

    constructUser(attr: string, val: any) {
        if (attr === 'r' || attr === 'w' || attr === 'x') {
            this.formService.userPost.permissions[attr] = val;
        } else {
            this.formService.userPost[attr] = val;
        }
    }

}
