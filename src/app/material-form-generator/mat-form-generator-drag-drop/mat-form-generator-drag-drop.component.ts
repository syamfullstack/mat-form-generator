import { Component, OnInit, ChangeDetectorRef, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { MatFormAdvancedSettingsComponent } from '../mat-form-advanced-settings/mat-form-advanced-settings.component';
import { getCustomInjector } from '../utilities/custom-injector';
import { AdvancedSettingsAction } from '../model/advanced-settings.model';
import { getControls } from '../utilities/controls';

@Component({
  selector: 'app-mat-form-generator-drag-drop',
  templateUrl: './mat-form-generator-drag-drop.component.html',
  styleUrls: ['./mat-form-generator-drag-drop.component.css']
})
export class MatFormGeneratorDragDropComponent implements OnInit {
  controls: any;
  selectedControls: any[] = [];
  inputFormGroup: FormGroup;
  action: AdvancedSettingsAction = {
    ok: (settings, index) => this.applySettings(settings, index),
    cancel: (index) => this.closeSettingsModal(index)
  };

  isFormArray = false;
  formArrayName: string;
  selectedControls1: any = {};

  @ViewChild('settings', { static: true, read: ViewContainerRef }) settings: ViewContainerRef;

  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.controls = getControls();
    this.inputFormGroup = this.formBuilder.group({});
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.item.data) {
      const control = { ...event.item.data };
      control.propertyName = control.propertyName +
        (+this.selectedControls.filter(a => a.inputType === control.inputType).length + 1);
      control.displayName = control.propertyName;
      this.selectedControls = [...this.selectedControls, control];
      this.selectedControls1[control.propertyName] = control;
      // const selectedControls = [...this.selectedControls];
      // this.selectedControls = [...selectedControls.splice(0, (event.currentIndex - 1)), control,
      //     ...selectedControls.splice(event.currentIndex, selectedControls.length)];
      this.createForm();
    } else {
      moveItemInArray(this.selectedControls, event.previousIndex, event.currentIndex);
      this.createForm();
    }
  }

  createForm() {
    this.selectedControls.forEach((a, i) => {
      if (!this.inputFormGroup.get(a.propertyName)) {
        this.inputFormGroup.addControl(a.propertyName, new FormControl());
      }
      this.inputFormGroup.setControl(a.propertyName, this.inputFormGroup.get(a.propertyName));
    });
    setTimeout(() => {
      this.cdr.detectChanges();
    });
  }

  onSettingsClick(index) {
    const selectedSettings = { ...this.controls[index], ...this.selectedControls[index] };
    this.selectedControls[index].openSettings = true;
    this.openSettingsModal(index, selectedSettings);
  }

  openSettingsModal(index, selectedSettings) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MatFormAdvancedSettingsComponent);
    this.settings.clear();
    const componentRef = this.settings.createComponent(componentFactory, 0, getCustomInjector(this.action));
    (<MatFormAdvancedSettingsComponent>componentRef.instance).index = index;
    (<MatFormAdvancedSettingsComponent>componentRef.instance).selectedSettings = selectedSettings;
  }

  closeSettingsModal(index) {
    this.selectedControls[index].openSettings = false;
    this.settings.clear();
  }

  applySettings(settings, index) {
    this.selectedControls[index] = { ...settings, inputArray: JSON.parse(settings.inputArray) };
    this.inputFormGroup = this.formBuilder.group({});
    this.createForm();
    this.settings.clear();
  }

  removeControl(propertyName, index) {
    this.inputFormGroup.removeControl(propertyName);
    this.selectedControls = this.selectedControls.filter((a, i) => i !== index);
  }

  createFormArray() {
    const selectedFormArrayControls = this.selectedControls.filter(a => a.selected);
    if (this.isFormArray) {
      this.isFormArray = false;
      let formArray = this.inputFormGroup.get(this.formArrayName) as FormArray;
      if (!formArray) {
        this.selectedControls1[this.formArrayName] = {
          displayName: this.formArrayName,
          formArrayName: this.formArrayName,
          controls: {}
        };
        this.inputFormGroup.addControl(this.formArrayName, new FormArray([]));
        formArray = this.inputFormGroup.get(this.formArrayName) as FormArray;
      }
      const formGroup = this.formBuilder.group({});
      let controls = {};
      selectedFormArrayControls.forEach(a => {
        this.inputFormGroup.removeControl(a.propertyName);
        // this.selectedControls1[this.formArrayName].controls = {
        //   ...this.selectedControls1[this.formArrayName].controls,
        //   [a.propertyName]: this.selectedControls.filter(a => a.propertyName === a.propertyName)
        // };
        controls = {
          ...controls,
          [a.propertyName]: this.selectedControls1[a.propertyName]
        };
        delete this.selectedControls1[a.propertyName];
        this.selectedControls = this.selectedControls.filter(a => a.propertyName !== a.propertyName);
        formGroup.addControl(a.propertyName, new FormControl());
      });
      this.selectedControls1[this.formArrayName].controls = [controls];
      formArray.push(formGroup);

      // this.isFormArray = false;
      // let formArray = this.inputFormGroup.get(this.formArrayName) as FormArray;
      // if (!formArray) {
      //   this.inputFormGroup.addControl(this.formArrayName, new FormArray([]));
      //   formArray = this.inputFormGroup.get(this.formArrayName) as FormArray;
      // }
      // const formGroup = this.formBuilder.group({});
      // selectedFormArrayControls.forEach(a => {
      //   this.inputFormGroup.removeControl(a.propertyName);
      //   this.selectedControls = this.selectedControls.filter(a => a.propertyName !== a.propertyName);
      //   formGroup.addControl(a.propertyName, new FormControl());
      // });
      // formArray.push(formGroup);
    } else if (!this.isFormArray && selectedFormArrayControls.length) {
      this.isFormArray = true;
    }
  }

  getObjectValuesOfControls(controls) {
    return Object.values(controls);
  }

  getFormArray(i, data) {
    this;
    debugger;
    const dat = (this.inputFormGroup.get(data.formArrayName) as FormArray).at(i);
    return (this.inputFormGroup.get(data.formArrayName) as FormArray).at(i);
  }

  deleteControls() {

  }

}
