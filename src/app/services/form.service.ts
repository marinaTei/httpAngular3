import {Injectable} from '@angular/core';
import {User} from '../user';
import {RequestService} from './request.service';
import {GlobalService} from './global.service';

@Injectable({
    providedIn: 'root'
})
export class FormService {

    userPost = <User>{firstname: '', lastname: '', email: '', birthdate: '', active: false, permissions: {r: false, w: false, x: false}};
    userPut = <User>{firstname: '', lastname: '', email: '', birthdate: '', active: null, permissions: {r: null, w: null, x: null}};
    idDel: string;

    alertText: string;
    alertDanger = false;
    alertSuccess = false;
    file: FileList;

    numberOfFiles = 0;

    constructor(private requestService: RequestService, private globalService: GlobalService) {
    }

    displayAlert(str: string, files: FileList) {
        this.alertText = str;
        if (str[0] === 'R') { this.alertSuccess = true; } else if (str[0] === 'P') { this.alertDanger = true; }
        console.log(files);
    }

    hideAlert(type?: string) {
        if (type === undefined) {
            this.alertDanger = false;
            this.alertSuccess = false;
        } else if (type === 'danger') {
            this.alertDanger = false;
        } else if (type === 'success') {
            this.alertSuccess = false;
        }
    }

    add() {
        this.requestService.addUser(this.userPost)
            .subscribe(
                (dataPost: any) => {
                    console.log(dataPost, 'post');
                    this.requestService.getAllUsers()
                        .subscribe(
                            (data: any) => {
                                this.globalService.arrayOfUsers = Object.keys(data.rows).map(it => data.rows[it]);
                                console.log(this.globalService.arrayOfUsers);
                            },
                            (err: any) => {
                                console.log(err);
                            },
                            () => {
                                console.log('get');
                            }
                        );
                },
                (err: any) => {
                    console.log(err);
                }
            );
    }

    update() {
        console.log(this.userPut);
        this.requestService.updateUser(this.userPut)
            .subscribe(
                (dataPut: any) => {
                    console.log(dataPut, 'update');
                    this.requestService.getAllUsers()
                        .subscribe(
                            (data: any) => {
                                this.globalService.arrayOfUsers = Object.keys(data.rows).map(it => data.rows[it]);
                                console.log(this.globalService.arrayOfUsers);
                            },
                            (err: any) => {
                                console.log(err);
                            },
                            () => {
                                console.log('get');
                            }
                        );
                },
                (err: any) => {
                    console.log(err);
                }
            );
    }

    delete() {
        this.requestService.deleteUser(this.idDel)
            .subscribe(
                (dataDel: any) => {
                    console.log(dataDel, 'delete');
                    this.requestService.getAllUsers()
                        .subscribe(
                            (data: any) => {
                                this.globalService.arrayOfUsers = Object.keys(data.rows).map(it => data.rows[it]);
                                console.log(this.globalService.arrayOfUsers);
                            },
                            (err: any) => {
                                console.log(err);
                            },
                            () => {
                                console.log('get');
                            }
                        );
                },
                (err: any) => {
                    console.log(err);
                }
            );
    }
}

