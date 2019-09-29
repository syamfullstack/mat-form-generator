import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArraySettingsComponent } from './form-array-settings.component';

describe('FormArraySettingsComponent', () => {
  let component: FormArraySettingsComponent;
  let fixture: ComponentFixture<FormArraySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormArraySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormArraySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
