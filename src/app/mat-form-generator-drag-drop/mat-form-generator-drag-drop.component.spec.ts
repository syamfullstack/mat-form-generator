import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatFormGeneratorDragDropComponent } from './mat-form-generator-drag-drop.component';

describe('MatFormGeneratorDragDropComponent', () => {
  let component: MatFormGeneratorDragDropComponent;
  let fixture: ComponentFixture<MatFormGeneratorDragDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatFormGeneratorDragDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatFormGeneratorDragDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
