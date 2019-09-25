export const getSpecFile = (input) => {
    return `
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ${input.settings.componentName+'Component'} } from './${input.settings.componentFileName}.component';
    
describe('${input.settings.componentName+'Component'}', () => {
    let component: ${input.settings.componentName+'Component'};
    let fixture: ComponentFixture<${input.settings.componentName+'Component'}>;
    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [ ${input.settings.componentName+'Component'} ]
        })
        .compileComponents();
    }));
    
    beforeEach(() => {
        fixture = TestBed.createComponent(${input.settings.componentName+'Component'});
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});`;
};