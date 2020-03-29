import { Injectable } from '@angular/core';

@Injectable()
export class Entitlement {
    constructor() { }

    public isEntitled(): boolean {
        let flag = false;
        if (document.cookie) {
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
