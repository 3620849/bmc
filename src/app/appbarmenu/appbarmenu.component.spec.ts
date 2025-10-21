import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppbarmenuComponent } from './appbarmenu.component';

describe('AppbarmenuComponent', () => {
  let component: AppbarmenuComponent;
  let fixture: ComponentFixture<AppbarmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppbarmenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppbarmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
