
import { Component, OnInit } from '@angular/core';
import { SelectItem, ConfirmationService } from 'primeng/api';
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';
import { GlobalEngagementsService } from './global-engagements.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ProposalListService } from '../proposallist/proposallist.service';

export interface ClientData {
    clientId: string;
    clientName: string;
}
export interface GNE {
    id: string;
    clientUIModel: {
        clientId: string;
        clientName: string;
    };
    clientName: string;
    clientPublicName: string;
    engagementDetails: string;
    engagementName: string;
    engagementType: string;
    brief: string;
    businessOwners: string;
    ownerArchitect: string;
    ownerTechnical: string;
    ownerFunctional: string;
    onsiteTeam: string;
    offShoreTeam: string;
    nearShoreTeam: string;
    clientLocation: string;
    offshoreLocation: string;
    nearshoreLocation: string;
    technologies: string;
    lob: string;
    domain: string;
    duration: any;
    primaryTag: string;
    secondaryTag: string;
    tertiaryTag: string;
}

@Component({
    selector: 'app-global-enagements',
    templateUrl: './global-enagements.component.html',
    styleUrls: ['./global-enagements.component.scss'],
    providers: [MessageService, GlobalEngagementsService, ConfirmationService, ProposalListService],
    animations: [
        trigger('rowExpansionTrigger', [
            state('void', style({
                transform: 'translateX(-10%)',
                opacity: 0
            })),
            state('active', style({
                transform: 'translateX(0)',
                opacity: 1
            })),
            transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class GlobalEnagementsComponent implements OnInit {

    tableCols = [
        { sort: true, field: 'id', header: 'ID', style: '5em', display: 'table-cell' },
        { sort: true, field: 'clientName', header: 'Internal Client Name', style: '10em', display: 'table-cell' },
        { sort: true, field: 'clientPublicName', header: 'Public Client Name', style: '20em', display: 'table-cell' },
        { sort: true, field: 'engagementName', header: 'Engagement Name', style: '', display: 'table-cell' },
        { sort: true, field: 'engagementType', header: 'Engagement Type', style: '', display: 'table-cell' },
        { sort: true, field: 'businessOwners', header: 'Business Owners', style: '', display: 'table-cell' },
        { sort: true, field: 'lob', header: 'LOB Covered', style: '', display: 'table-cell' },
        { sort: true, field: 'domain', header: 'Domain', style: '', display: 'table-cell' },
        { sort: true, field: 'duration', header: 'Duration', style: '9em', display: 'table-cell' },
        { sort: true, field: 'brief', header: 'Description', display: 'none' },
        { sort: true, field: 'engagementDetails', header: 'Engagement Details', display: 'none' },
        { sort: true, field: 'technologies', header: 'Technology Stack ', display: 'none' },
        { sort: true, field: 'ownerArchitect', header: '', display: 'none' },
        { sort: true, field: 'ownerTechnical', header: '', display: 'none' },
        { sort: true, field: 'ownerFunctional', header: '', display: 'none' },
        { sort: true, field: 'onsiteTeam', header: '', display: 'none' },
        { sort: true, field: 'offshoreTeam', header: '', display: 'none' },
        { sort: true, field: 'nearShoreTeam', header: '', display: 'none' },
        { sort: true, field: 'clientLocation', header: '', display: 'none' },
        { sort: true, field: 'offshoreLocation', header: '', display: 'none' },
        { sort: true, field: 'nearshoreLocation', header: '', display: 'none' },
        { sort: true, field: 'primaryTag', header: '', display: 'none' },
        { sort: true, field: 'secondaryTag', header: '', display: 'none' },
        { sort: true, field: 'secondaryTag', header: '', display: 'none' },

    ];
    hiddenColsCount = this.tableCols.filter(col => col.display === 'none').length;


    engagement: GNE;
    engagements: GNE[];
    clonedEngagements: GNE[] = [];
    newEngagement: boolean;
    displayDialog: boolean;
    selectedEngagement: GNE;
    currentIndex: number;
    msgs: Message[] = [];

    clientData: ClientData[];
    clientDropDown: SelectItem[];
    constructor(public messageService: MessageService, public globalEngagementsService: GlobalEngagementsService,
                public confirmationService: ConfirmationService, public proposalListService: ProposalListService) { }

    ngOnInit() {
        this.getClientData();
        this.getEngagements();
    }

    getEngagements() {
        this.globalEngagementsService.getGlobalEngagementsData().subscribe(
            (res) => {
                res = res.
                    map(e => {
                        return { ...e, clientName: e.clientUIModel.clientName };
                    });
                this.engagements = res;
            },
            (err) => { 
                this.messageService.add({ severity: 'error', summary: 'Failure', detail: 'Error in getting engagements data. Please refresh page' });
            }
        );
    }

    getClientData() {
        this.clientData = [];
        this.proposalListService.getAllClients().subscribe((data: any) => {
            this.clientData = data;
            this.clientData = this.clientData.filter(cd => cd.clientName.trim() !== '');
            console.log(this.clientData);
            this.clientDropDown = this.clientData.map((cd) => {
                return {
                    label: cd.clientName,
                    value: cd.clientName
                };
            });
            console.log(this.clientDropDown);
        },
        (err) => {
            this.messageService.add({ severity: 'error', summary: 'Failure', detail: 'Error in getting client data. Please refresh page' });
        });
    }

    onRowEditInit(engagement: GNE) {
        this.clonedEngagements[engagement.id] = { ...engagement };
        this.displayDialog = true;
        this.newEngagement = false;
        this.engagement = engagement;
        this.currentIndex = this.engagements.indexOf(engagement);
    }

    onRowEditCancel(engagement: GNE) {
        this.engagements[this.currentIndex] = this.clonedEngagements[engagement.id];
        delete this.clonedEngagements[engagement.id];
        this.currentIndex = null;
        this.newEngagement = false;
        this.displayDialog = false;
    }

    getNewEngObj(): GNE {
        return {
            id: '',
            clientUIModel: {
                clientId: this.clientData[0].clientId,
                clientName: this.clientData[0].clientName
            },
            clientName: this.clientData[0].clientName,
            clientPublicName: '',
            engagementDetails: '',
            engagementName: '',
            engagementType: '',
            brief: '',
            businessOwners: '',
            ownerArchitect: '',
            ownerTechnical: '',
            ownerFunctional: '',
            onsiteTeam: '',
            offShoreTeam: '',
            nearShoreTeam: '',
            clientLocation: '',
            offshoreLocation: '',
            nearshoreLocation: '',
            technologies: '',
            lob: '',
            domain: '',
            duration: '',
            primaryTag: '',
            secondaryTag: '',
            tertiaryTag: ''
        }
    }

    showDialogToAdd() {
        this.newEngagement = true;
        this.engagement = this.getNewEngObj();
        console.log(this.engagement);
        this.displayDialog = true;
    }



    save() {
        const engagements = [...this.engagements];
        this.engagement.clientUIModel.clientName = this.engagement.clientName;
        this.engagement.clientUIModel.clientId = this.clientData.find(cd => cd.clientName === this.engagement.clientName).clientId;
        if (this.newEngagement) {
            delete this.engagement.id;
            delete this.engagement.clientName;
            this.globalEngagementsService.updateGlobalEngagementData(this.engagement).subscribe(
                (res) => {
                    engagements.push(res);
                    this.engagements = engagements;
                    this.engagement = null;
                    this.displayDialog = false;
                    this.newEngagement = false;
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Engagement is successfully added' });
                    this.getEngagements();
                },
                (err) => {
                    this.engagement = null;
                    this.newEngagement = false;
                    this.displayDialog = false;
                    this.messageService.add({ severity: 'error', summary: 'Failure', detail: 'Error in adding engagement. Please try again' });
                    this.getEngagements();
                }
            );
        } else {
            engagements[this.engagements.indexOf(this.engagement)] = this.engagement;
            this.globalEngagementsService.updateGlobalEngagementData(this.engagement).subscribe(
                (res) => {
                    this.engagements = engagements;
                    delete this.clonedEngagements[this.engagement.id];
                    this.engagement = null;
                    this.displayDialog = false;
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Engagements are updated' });
                    this.getEngagements();
                },
                (err) => {
                    this.engagement = null;
                    this.displayDialog = false;
                    this.messageService.add({ severity: 'error', summary: 'Failure', detail: 'Error in updating engagements. Please try again' });
                    this.getEngagements();
                }
            );
        }
    }

    deleteEngagement() {
        this.displayDialog = false;
        this.newEngagement = false;
        this.globalEngagementsService.deleteGlobalEngagementData(this.engagement.id).subscribe(
            (res) => {
                this.engagements = this.engagements.filter((val, i) => i !== this.currentIndex);
                this.engagement = null;
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Engagement has been deleted' });
                this.getEngagements();
            },
            (err) => {
                this.engagement = null;
                this.messageService.add({ severity: 'danger', summary: 'Failure', detail: 'Error in deleting engagement. Please try again' });
                this.getEngagements();
            }
        );
    }

    delete() {
        this.messageService.clear();
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.deleteEngagement();
            }
        });
    }

}
