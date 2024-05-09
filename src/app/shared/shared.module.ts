import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarlateralComponent } from './nav-barlateral/nav-barlateral.component';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    NavBarlateralComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports:[
    NavBarlateralComponent,
    HttpClientModule
  ]
})
export class SharedModule { }
