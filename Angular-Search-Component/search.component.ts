import { Component, OnInit, OnDestroy, Inject, ViewChild, ElementRef } from '@angular/core';
import { NgForm, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { NavService } from './nav.service';
import { SearchService } from './search.service';
import { IfAutofocus } from './ngif-autofocus.directive';

//Typescript data structure storing listing of products and details (private)
import { allProductsForSearch } from '../shared/available-products';

import { Subscription } from 'rxjs/Subscription';


@Component({
    selector: 'search',
    templateUrl: './search.template.html',
    styleUrls: ['./search.styles.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
    searchTerm: FormControl;
    searchResults: string = '';
    searchArray: string[] = ['name', 'module', 'desc'];
    items: Object[] = []; //items on display (page)
    originalItems: Object[] = allProductsForSearch; //original items (for reset)
    totalEntries: number = 0;

    allSubscription: Subscription;
    SearchProducts: FormGroup;

    constructor(
        public navService: NavService,
        public router: Router,
        public searchService: SearchService
    ) { }

    ngOnInit() {
        this.searchTerm = new FormControl();
        this.SearchProducts = new FormGroup({
            searchTerm: this.searchTerm
        });

        this.allSubscription = this.searchTerm.valueChanges
            .subscribe(result => {
                let itemsToSearch = this.originalItems;
                this.searchService.findItemsFromMultiple(result, itemsToSearch, this.searchArray)
                    .then(allFiltered => {
                        this.items = result.length > 0 ? allFiltered : [];
                        this.totalEntries = this.items.length;
                    });
        });
    }

    ngOnDestroy() {
        this.allSubscription.unsubscribe();
    }

    clearSearch() {
        this.searchService.closeSearch();
        this.searchTerm.setValue('');
        this.items = [];
    }

    goToSoftware(evt) {
        evt.preventDefault();
        this.clearSearch();
        this.router.navigateByUrl('/')
            .then(result => {
                this.navService.goToAnchor('#find-your-software');
            });
    }

    goToContact(evt) {
        evt.preventDefault();
        this.clearSearch();
        this.navService.openContact();
    }

    navigateToProduct(path, evt?) {
        if(evt) { evt.preventDefault(); }
        this.clearSearch();
        this.router.navigateByUrl(`/${path}`);
    }
}