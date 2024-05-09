import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { FinicialComponent } from './componentes/finicial/finicial.component';
import { RfinalComponent } from './componentes/rfinal/rfinal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { SuperiorComponent } from './plantilla/superior/superior.component';
import { InferiorComponent } from './plantilla/inferior/inferior.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { AgChartsAngular } from 'ag-charts-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';






@NgModule({
  declarations: [
    AppComponent,
    FinicialComponent,
    RfinalComponent,
    RoutingComponents,
    SuperiorComponent,
    InferiorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    AgGridModule,
    AgChartsAngular,
    BrowserAnimationsModule,
    ButtonModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
