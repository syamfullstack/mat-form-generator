import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatFormGeneratorComponent } from './mat-form-generator.component';
    
describe('MatFormGeneratorComponent', () => {
    let component: MatFormGeneratorComponent;
    let fixture: ComponentFixture<MatFormGeneratorComponent>;
    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [ MatFormGeneratorComponent ]
        })
        .compileComponents();
    }));
    
    beforeEach(() => {
        fixture = TestBed.createComponent(MatFormGeneratorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});