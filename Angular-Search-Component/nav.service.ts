import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { PageScrollInstance } from 'ng2-page-scroll';

@Injectable()
export class NavService {
    DEFAULT_TITLE: string = 'Contact Us';
    contactOpen: boolean = false;
    contactTitle: string;

    constructor(
        private pageScrollService: PageScrollService, 
        @Inject(DOCUMENT) private document: any
    ) {
        this.contactTitle = this.DEFAULT_TITLE;
    }

    openContact(title?) {
        this.contactOpen = true;
        if(title) { this.contactTitle = title; }
    }

    closeContact() {
        this.contactOpen = false;
        this.contactTitle = this.DEFAULT_TITLE;
    }

    goToAnchor(anchorName: string) {
        let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, anchorName);
        this.pageScrollService.start(pageScrollInstance);
    };
}