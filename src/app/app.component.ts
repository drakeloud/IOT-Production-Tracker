import { Component } from '@angular/core';
import { ProductionItem } from './productionModel';
import { Http } from '../../node_modules/@angular/http';
import { DatePipe } from '@angular/common';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Production';
    production: ProductionItem[] = [];
    isDataLoaded = false;
    datePipe = new DatePipe('en-US');
    mostRecent = [];
    productionItems: ProductionItem[];

    constructor(http: Http) {
        // TODO: ADD YOUR INVOKE URL WITH THE ENDPOINT HERE!
        http.get('https://XXXXXXXXXX.execute-api.us-west-2.amazonaws.com/prod/production')
            .subscribe((res) => this.production = this.convertJson(res.json()));
    }

    convertJson(json: any): ProductionItem[] {
        const production: ProductionItem[] = [];

        json.body.forEach(item => {
            production.push(ProductionItem.deserialize(item));
        });

        this.setData(production);
        return production;
    }

    setData(production) {
        this.isDataLoaded = true;

        this.mostRecent = production.slice(-5).reverse();

        const temp: ProductionItem[] = [];
        this.mostRecent.forEach(item => {
            let clickType = '';

            if (item.clickType === 'SINGLE') {
                clickType = 'Product 1';
            } else if (item.clickType === 'DOUBLE') {
                clickType = 'Product 2';
            } else if (item.clickType === 'LONG') {
                clickType = 'Product 1 & 2';
            }

            temp.push(new ProductionItem(item.id, this.datePipe.transform(item.timestamp, 'MMM d, h:mm a'), clickType));

        });
        this.mostRecent = temp;
        this.productionItems = production;
    }

}
