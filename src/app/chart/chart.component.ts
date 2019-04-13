import { Component, Input, AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { DatePipe } from '@angular/common';
import { ProductionItem } from '../productionModel';

@Component({
    selector: 'chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})

export class ChartComponent implements AfterViewInit {

    @Input('production') production: ProductionItem[];

    chart: any;
    canvas: any;
    ctx: any;
    datePipe = new DatePipe('en-US');
    labels = [];
    product1 = [];
    product2 = [];
    productBoth = [];

    constructor(private cdr: ChangeDetectorRef) { }

    setData() {
        const temp: ProductionItem[] = [];
        this.production.forEach(item => {
            temp.push(new ProductionItem(item.id, this.datePipe.transform(item.timestamp, 'MMM d'), item.clickType));
        });

        const groupBy = (xs, key) => {
            return xs.reduce(function (rv, x) {
                (rv[x[key]] = rv[x[key]] || []).push(x);
                return rv;
            }, {});
        };

        const groupedData = groupBy(temp, 'timestamp');
        Object.keys(groupedData).forEach(date => {
            this.labels.push(date);
            let prod1 = 0;
            let prod2 = 0;
            let prodBoth = 0;
            groupedData[date].forEach(item => {
                if (item.clickType === 'SINGLE') {
                    prod1++;
                } else if (item.clickType === 'DOUBLE') {
                    prod2++;
                } else if (item.clickType === 'LONG') {
                    prodBoth++;
                }
            });

            this.product1.push(prod1);
            this.product2.push(prod2);
            this.productBoth.push(prodBoth);
        });
    }

    ngAfterViewInit() {
        this.setData();
        this.canvas = document.getElementById('stackedChart');
        this.ctx = this.canvas.getContext('2d');
        this.chart = new Chart(this.ctx, {
            type: 'bar',
            data: {
                labels: this.labels,
                datasets: [
                    {
                        label: 'Product 1',
                        data: this.product1,
                        backgroundColor: '#FAEBCC' // yellow
                    },
                    {
                        label: 'Product 2',
                        data: this.product2,
                        backgroundColor: '#D6E9C6' // green
                    },
                    {
                        label: 'Product 1 & 2',
                        data: this.productBoth,
                        backgroundColor: '#EBCCD1' // red
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    xAxes: [{ stacked: true }],
                    yAxes: [{ stacked: true }]
                }
            }
        });
        this.cdr.detectChanges();

    }
}
