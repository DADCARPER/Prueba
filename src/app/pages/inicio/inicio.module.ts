import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InicioRoutingModule } from './inicio-routing.module';
import { InicioPageComponent } from './inicio-page/inicio-page.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    InicioPageComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class InicioModule { }
