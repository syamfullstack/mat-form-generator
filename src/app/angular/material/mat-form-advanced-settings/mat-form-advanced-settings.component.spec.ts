import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatFormAdvancedSettingsComponent } from './mat-form-advanced-settings.component';

describe('MatFormAdvancedSettingsComponent', () => {
  let component: MatFormAdvancedSettingsComponent;
  let fixture: ComponentFixture<MatFormAdvancedSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatFormAdvancedSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatFormAdvancedSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
