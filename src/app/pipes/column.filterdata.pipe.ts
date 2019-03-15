import { PipeTransform, Pipe } from '@angular/core';
@Pipe({
    name: 'recordSearch'
})

export class ColumnFilterDataPipe implements PipeTransform {
    transform(items: any[], clientNameSearch: string, docNameSearch: string, startSearch: string, endSearch: string, reqSearch: string, regionSearch: string, statusSearch: string, relatedDocSearch: string) {
        if (items && items.length) {
            return items.filter(item => {
                console.log("clientName ", item)
                console.log("clientNameSearch ", docNameSearch)
                if (clientNameSearch && item.clientName.toLowerCase().indexOf(clientNameSearch.toLowerCase()) === -1) {
                    return false;
                }
                if (docNameSearch && item.docName.toLowerCase().indexOf(docNameSearch.toLowerCase()) === -1) {
                    return false;
                }
                if (startSearch && item.startDate.toLowerCase().indexOf(startSearch.toLowerCase()) === -1) {
                    return false;
                }
                if (endSearch && item.endDate.toLowerCase().indexOf(endSearch.toLowerCase()) === -1) {
                    return false;
                }
                if (reqSearch && item.requirement.toLowerCase().indexOf(reqSearch.toLowerCase()) === -1) {
                    return false;
                }
                if (regionSearch && item.region.toLowerCase().indexOf(regionSearch.toLowerCase()) === -1) {
                    return false;
                }
                if (statusSearch && item.status.toLowerCase().indexOf(statusSearch.toLowerCase()) === -1) {
                    return false;
                }
                if (relatedDocSearch && item.company.toLowerCase().indexOf(relatedDocSearch.toLowerCase()) === -1) {
                    return false;
                }
                return true;
            })
        }
        else {
            return items;
        }
    }
}