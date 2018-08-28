import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,
        ChartComponent
    ],
    imports: [
        BrowserModule,
        HttpModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
