import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";

@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
    constructor() {
        super();
    }

    getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (!length) return '';
        return `page ${page + 1} of ${Math.ceil(length/pageSize)}`;
    }
}
