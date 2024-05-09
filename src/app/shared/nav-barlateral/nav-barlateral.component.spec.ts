import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarlateralComponent } from './nav-barlateral.component';

describe('NavBarlateralComponent', () => {
  let component: NavBarlateralComponent;
  let fixture: ComponentFixture<NavBarlateralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarlateralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavBarlateralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
