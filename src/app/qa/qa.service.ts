import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Attachment {
    name: string;
    link: string;
    size: string;
}

export interface Email {
    id: string;
    from: string;
    to: string[];
    subject: string;
    attachment: Attachment[];
    date: Date;
    body: string;
}

export interface EmailChain {
    emails: Email[];
}

// The list which will be displayed on the left pane
export interface EmailList {
    emailChain: EmailChain[];
}

@Injectable()
export class QaService {
    constructor(private http: HttpClient) { }
    public getEmailList(): Observable <EmailList> {
        return Observable.create(null);
    }
}
