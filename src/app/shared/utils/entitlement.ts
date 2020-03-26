import { Injectable } from '@angular/core';

@Injectable()
export class Entitlement {
    constructor() { }

    public isEntitled(): boolean {
        let flag = false;
        if (localStorage.getItem('currentUser')) {
            let currentUser = JSON.parse(localStorage.getItem('currentUser'));
            // console.log(currentUser);
            for (let e in currentUser.entitlements) {
                if (currentUser.entitlements[e] == 'WRITE') {
                    flag = false;
                } else {
                    flag = true;
                }
            }
        } else if (document.cookie) {
            let currentUser =  JSON.parse(document.cookie.split(';', 1)[0]) ;
            for (let e in currentUser.entitlements) {
                if (currentUser.entitlements[e] == 'WRITE') {
                    flag = false;
                } else {
                    flag = true;
                }
            }
        }
        return flag;
    }
}
