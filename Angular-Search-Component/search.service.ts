import { Injectable, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SearchService {
    searchOpen: boolean = false;
    svcRenderer: Renderer2; //this is injected by app.component- only way to manipulate the body to hide overflow when search it open (can't directly inject renderer into a service- only a component)

    openSearch() { 
        this.searchOpen = true;
        this.svcRenderer.addClass(document.body, 'hide-overflow'); 
    }

    closeSearch() { 
        this.svcRenderer.removeClass(document.body, 'hide-overflow');
        this.searchOpen = false; 
    }

    findItems(item, group: Array<Object>, property: any): Promise<Array<Object>> {
        /*
        find item from larger group (within that group's property).  passed property can be a string (single field search) or array of strings (searching more than one field)
        uses data already provided on screen load (but we can add http module if we need a version that hits the backend.
        */
        return new Promise(
            function (resolve, reject) {
                const lowerItem = typeof item === 'string' ? item.toLowerCase() : item;
                let filtered: Array<Object> = [];

                filtered = group.filter(g => {
                    if (g[property]) {
                        const lowerProp = g[property].toLowerCase();

                        //search group (by property provided) for substring item
                        if (lowerProp.search(lowerItem) !== -1) {
                            return g[property];
                        }
                    }
                });

                resolve(filtered);
            }
        );
    }

    findItemsFromMultiple(item, group: Array<Object>, property: Array<string>): Promise<Array<Object>> {
        return new Promise(
            function (resolve, reject) {
                const itemToStr = item.toString();
                const lowerItem = itemToStr.toLowerCase();
                let filtered: Array<Object> = [];

                filtered = group.filter((g, index, arr) => {
                    for (let i = 0, l = property.length; i < l; i += 1) {
                        if(g[property[i]]) {
                            if(typeof g[property[i]] === 'string') {
                                const lowerProp = g[property[i]].toLowerCase();
                                if (lowerProp.includes(lowerItem)) {
                                    return g[property[i]];
                                }
                            } else {
                                if(g[property[i]].toString().includes(itemToStr)) {
                                    return g[property[i]];
                                }
                            }
                        }
                    }
                });

                resolve(filtered);
            }
        );
    }

    findItemsInDateRange(start: Date, end: Date, group: Array<Object>, property: string): Promise<Array<Object>> {
        return new Promise(
            function (resolve, reject) {
                let filtered: Array<Object> = [];

                filtered = group.filter(g => {
                    let thisDateAsNumber = +new Date(g[property]);
                    if(thisDateAsNumber >= +start && thisDateAsNumber <= +end) {
                        return g[property];
                    }
                });

                resolve(filtered);
            }
        );
    }
}