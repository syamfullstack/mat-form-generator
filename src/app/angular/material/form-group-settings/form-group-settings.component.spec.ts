import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroupSettingsComponent } from './form-group-settings.component';

describe('FormGroupSettingsComponent', () => {
  let component: FormGroupSettingsComponent;
  let fixture: ComponentFixture<FormGroupSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGroupSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGroupSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
