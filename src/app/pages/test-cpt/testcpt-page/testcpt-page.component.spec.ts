import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcptPageComponent } from './testcpt-page.component';

describe('TestcptPageComponent', () => {
  let component: TestcptPageComponent;
  let fixture: ComponentFixture<TestcptPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestcptPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestcptPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
