import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]'
})
export class DragAndDropDirective {
    @HostBinding('style.background') private backgroud = 'white';
    // @HostBinding('') private backgroud= 'white';
    @HostListener('dragover', ['$event']) onDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
        let files = event.dataTransfer.files;
            console.log('drag over');
        this.backgroud = 'lightgray';
    }
    @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
        event.preventDefault();
        event.stopPropagation();
        console.log('drag leave');
        this.backgroud = 'white';
    }

    @HostListener('drop', ['$event']) public onDrop(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        let files = evt.dataTransfer.files;
        if (files.length > 0){
            console.log('drop');
            this.backgroud = 'white';
            console.log(files);
        }
    }
  constructor() { }

}
