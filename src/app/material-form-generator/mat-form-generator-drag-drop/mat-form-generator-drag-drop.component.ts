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
    ok: (settings, propertyName, formArryName) => this.applySettings(settings, propertyName, formArryName),
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
    // this.selectedControls.forEach((a, i) => {
    //   if (!this.inputFormGroup.get(a.propertyName)) {
    //     this.inputFormGroup.addControl(a.propertyName, new FormControl());
    //   }
    //   this.inputFormGroup.setControl(a.propertyName, this.inputFormGroup.get(a.propertyName));
    // });
    // setTimeout(() => {
    //   this.cdr.detectChanges();
    // });
    const controls = Object.values(this.selectedControls1);
    controls.forEach((control: any) => {
      if (control.formArrayName) {
        let formArray = this.inputFormGroup.get(control.formArrayName);
        if (!formArray || 1 === 1) {
          this.inputFormGroup.addControl(control.formArrayName, this.formBuilder.array([]));
          formArray = this.formBuilder.array(control.controls.map((item) => {
            const formGroup = this.formBuilder.group({});
            const keyValueControls = Object.values(item);
            keyValueControls.forEach((ctrl: any) => {
              formGroup.addControl(ctrl.propertyName, new FormControl());
            });
            return formGroup;
          }));
          this.inputFormGroup.setControl(control.formArrayName, formArray);
        } else {
          this.inputFormGroup.setControl(control.formArrayName, this.inputFormGroup.get(control.formArrayName));
        }
      } else {
        if (!this.inputFormGroup.get(control.propertyName)) {
          this.inputFormGroup.addControl(control.propertyName, new FormControl());
        }
        this.inputFormGroup.setControl(control.propertyName, this.inputFormGroup.get(control.propertyName));
      }
    })
  }

  onSettingsClick(data, formArrayName) {
    // const selectedSettings = { ...this.controls[index], ...this.selectedControls[index] };
    // this.selectedControls[index].openSettings = true;
    // this.openSettingsModal(index, selectedSettings);
    // data.openSettings = true;
    this.openSettingsModal(formArrayName, data);
  }

  openSettingsModal(formArrayName, selectedSettings) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MatFormAdvancedSettingsComponent);
    this.settings.clear();
    const componentRef = this.settings.createComponent(componentFactory, 0, getCustomInjector(this.action));
    // (componentRef.instance as MatFormAdvancedSettingsComponent).index = index;
    (componentRef.instance as MatFormAdvancedSettingsComponent).formArrayName = formArrayName;
    (componentRef.instance as MatFormAdvancedSettingsComponent).selectedSettings = selectedSettings;
  }

  closeSettingsModal(index) {
    // this.selectedControls[index].openSettings = false;
    this.settings.clear();
  }

  applySettings(settings, propertyName, formArryName) {
    // this.selectedControls[index] = { ...settings, inputArray: JSON.parse(settings.inputArray) };
    // this.inputFormGroup = this.formBuilder.group({});
    // this.createForm();
    // this.settings.clear();
    // settings = { ...settings, inputArray: JSON.parse(settings.inputArray) };
    if (formArryName) {
      const controls = [];
      (this.selectedControls1[formArryName].controls).forEach(controlData => {
        const control = {};
        Object.keys(controlData).forEach((key => {
          if (key !== propertyName) {
            control[key] = controlData[key]
          } else {
            control[propertyName] = settings;
          }
        }));
        controls.push(control);
      });
      this.selectedControls1[formArryName].controls = controls;

    } else {
      const controls = {};
      this.inputFormGroup = this.formBuilder.group({});
      Object.keys(this.selectedControls1).forEach((key => {
        if (key !== propertyName) {
          controls[key] = this.selectedControls1[key]
        } else {
          controls[propertyName] = settings;
        }
      }));
      this.selectedControls1 = controls;
      // delete this.selectedControls1[propertyName];
      // this.selectedControls1[settings.propertyName] = settings;
    }
    this.createForm();
    this.settings.clear();
  }

  removeControl(propertyName, index) {
    this.inputFormGroup.removeControl(propertyName);
    this.selectedControls = this.selectedControls.filter((a, i) => i !== index);
  }

  createFormArray() {
    const selectedFormArrayControls = this.selectedControls.filter(a => a.selected);
    const selectedFormArrayControls1 = (Object.values(this.selectedControls1)).filter((a: any) => a.selected);
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
      selectedFormArrayControls1.forEach((a: any) => {
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
    } else if (!this.isFormArray && selectedFormArrayControls1.length) {
      this.isFormArray = true;
    }
  }

  getObjectValuesOfControls(controls) {
    return Object.values(controls);
  }

  // getFormArray(i, data) {
  //   this;
  //   debugger;
  //   const dat = (this.inputFormGroup.get(data.formArrayName) as FormArray).at(i);
  //   return (this.inputFormGroup.get(data.formArrayName) as FormArray).at(i);
  // }

  deleteControls() {

  }

}
