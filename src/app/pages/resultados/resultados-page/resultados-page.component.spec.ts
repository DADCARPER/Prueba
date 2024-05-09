import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosPageComponent } from './resultados-page.component';

describe('ResultadosPageComponent', () => {
  let component: ResultadosPageComponent;
  let fixture: ComponentFixture<ResultadosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultadosPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultadosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
