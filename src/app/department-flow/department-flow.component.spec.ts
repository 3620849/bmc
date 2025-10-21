import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentFlowComponent } from './department-flow.component';

describe('DepartmentFlowComponent', () => {
  let component: DepartmentFlowComponent;
  let fixture: ComponentFixture<DepartmentFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentFlowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
