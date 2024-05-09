import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestCptRoutingModule } from './test-cpt-routing.module';
import { TestcptPageComponent } from './testcpt-page/testcpt-page.component';


@NgModule({
  declarations: [
    TestcptPageComponent
  ],
  imports: [
    CommonModule,
    TestCptRoutingModule
  ]
})
export class TestCptModule { }
