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
    subj: string;
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
    public getEmailList(): Observable<EmailList> {
        const dummyAttachment: Attachment[] = [
            {
                name: 'testAttach-1',
                link: 'a.com',
                size: '124 kb'
            },
            {
                name: 'testAttach-2',
                link: 'b.com',
                size: '125 kb'
            },
            {
                name: 'testAttach-3',
                link: 'a.com',
                size: '126 kb'
            }
        ];
        const dummyEmail1: Email = {
            id: '1',
            from: 'a',
            to: ['b', 'c'],
            subj: '',
            attachment: dummyAttachment,
            date: new Date(),
            body: 'emailbody1'
        };
        const dummyEmail2: Email = {
            id: '2',
            from: 'c',
            to: ['a', 'b'],
            subj: '',
            attachment: dummyAttachment,
            date: new Date(),
            body: 'emailbody2'
        };
        const dummyEmailChain: EmailChain = {
            emails: [dummyEmail1, dummyEmail2]
        }
            ;
        const dummyEmailList: EmailList = {
            emailChain:
                [dummyEmailChain]
        };
        // const dummyRes: EmailList = [
        //     emailChain = {
        //         [
        //             {
        //                 id: '1',
        //                 from: 'a',
        //                 to: ['a', 'b'],
        //                 subject = 'abc',
        //                 attachment =[
        //                     {
        //                         name: 'a',
        //                         link: 'a.com',
        //                         size: '124'
        //                     }
        //                 ],
        //                 date: new Date(),
        //                 body: 'emailbody'
        //             }
        //         ]
        //     }
        // ];
        return Observable.create(dummyEmailList);
    }
}
