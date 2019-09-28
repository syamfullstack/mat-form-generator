import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalFormSettingsComponent } from './global-form-settings.component';

describe('GlobalFormSettingsComponent', () => {
  let component: GlobalFormSettingsComponent;
  let fixture: ComponentFixture<GlobalFormSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalFormSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalFormSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
