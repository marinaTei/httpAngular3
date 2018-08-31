import {Directive, HostBinding, HostListener, OnInit} from '@angular/core';
import {FormService} from '../services/form.service';

@Directive({
  selector: '[appDragAndDrop]'
})
export class DragAndDropDirective {
    numberOfFiles = 0;
    @HostBinding('style.color') private color = 'lightgray';
    @HostBinding('style.border-color') private borderColor = 'lightgray';
    @HostListener('dragover', ['$event']) onDragOver(event) {
        this.formService.hideAlert();
        event.preventDefault();
        event.stopPropagation();
        this.color = 'darkgray';
        this.borderColor = 'darkgray';
    }
    @HostListener('dragleave', ['$event']) public onDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();
        this.color = 'lightgray';
        this.borderColor = 'lightgray';
    }

    @HostListener('drop', ['$event']) public onDrop(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        console.log('drop');
        const files = evt.dataTransfer.files;
        console.log(files);
        if (files.length > 0) {
            this.numberOfFiles += files.length;
            console.log(this.numberOfFiles);

            for (let i = 0; i < files.length; i++) {
                if (files.item(i).type !== 'text/plain' && files.item(i).type !== 'application/json') {
                    this.formService.displayAlert('Please add only .txt or .json files!', files);
                }
            }
            if (!this.formService.alertDanger) { this.formService.displayAlert('Ready to save!', files); }
            console.log(files.item(0).type); // text/plain application/json
            this.color = 'lightgray';
            this.borderColor = 'lightgray';

            const reader = new FileReader();
            reader.onprogress = function () { if (reader.readyState === 2) { console.log(reader.readAsText(files.item(0))); } };
        }
    }

   constructor(private formService: FormService) { }

}
