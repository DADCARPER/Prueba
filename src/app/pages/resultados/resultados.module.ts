import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultadosRoutingModule } from './resultados-routing.module';
import { ResultadosPageComponent } from './resultados-page/resultados-page.component';


@NgModule({
  declarations: [
    ResultadosPageComponent
  ],
  imports: [
    CommonModule,
    ResultadosRoutingModule
  ]
})
export class ResultadosModule { }
