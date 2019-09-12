import { Component, OnInit, Input, ViewChild, TemplateRef, AfterViewInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArrayName } from '@angular/forms';

@Component({
  selector: 'app-mat-form-advanced-settings',
  templateUrl: './mat-form-advanced-settings.component.html',
  styleUrls: ['./mat-form-advanced-settings.component.scss']
})
export class MatFormAdvancedSettingsComponent implements OnInit, AfterViewInit {
  @Input() selectedSettings: any;
  @Input() formArrayName: any;
  @Input() formGroupName: any;
  // @Input() index: any;

  settingsFormGroup: FormGroup;

  @ViewChild('settings', { static: false }) settingsRef: TemplateRef<any>;

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, @Inject('Action') public action: any) { }

  ngOnInit() {
    this.createForm();

  }

  ngAfterViewInit() {
    this.dialog.open(this.settingsRef, {
      width: '400px',
      data: { index: null }
    });
  }

  createForm() {
    let inputArray;
    try {
      inputArray = JSON.stringify(this.selectedSettings.inputArray);
    } catch (ex) {
      inputArray = null;
    }
    this.settingsFormGroup = this.formBuilder.group({
      inputType: [this.selectedSettings.inputType],
      displayName: [this.selectedSettings.displayName, [Validators.required]],
      propertyName: [this.selectedSettings.propertyName, [Validators.required]],
      inputArray: [inputArray, [this.inputArrayValidator]],
      valueField: [this.selectedSettings.valueField, [this.valueFieldValidator.bind(this)]],
      displayField: [this.selectedSettings.displayField, [this.displayFieldValidator.bind(this)]],
      required: [this.selectedSettings.required]
    });
  }

  inputArrayValidator(control: AbstractControl): { [key: string]: string } {
    try {
      const jsonObj = JSON.parse((control.value || '').trim());
    }
    catch (ex) {
      return {
        message: 'Invalid JSON String'
      }
    }
    return null;
  }

  valueFieldValidator(control: AbstractControl): { [key: string]: string } {
    try {
      const jsonObj = JSON.parse((this.settingsFormGroup.value.inputArray || '').trim());
      if (jsonObj && jsonObj.length && jsonObj[0] && jsonObj[0][control.value]) {
        return null;
      } else {
        return {
          message: 'Invalid value field'
        }
      }
    }
    catch (ex) {
      return {
        message: 'Invalid value field'
      }
    }
  }

  displayFieldValidator(control: AbstractControl): { [key: string]: string } {
    try {
      const jsonObj = JSON.parse((this.settingsFormGroup.value.inputArray || '').trim());
      if (jsonObj && jsonObj.length && jsonObj[0] && jsonObj[0][control.value]) {
        return null;
      } else {
        return {
          message: 'Invalid text field'
        }
      }
    } catch (ex) {
      return {
        message: 'Invalid text field'
      }
    }
  }



  closeSettings() {
    this.dialog.closeAll();
    this.action.cancel(this.selectedSettings.propertyName, this.formArrayName);
  }

  applySettings() {
    // this.selectedSettings = { ...this.settingsFormGroup.value, inputArray: JSON.parse(this.settingsFormGroup.value.inputArray) };
    this.action.ok({ ...this.settingsFormGroup.value, inputArray: JSON.parse(this.settingsFormGroup.value.inputArray) },
      this.selectedSettings.propertyName, this.formGroupName, this.formArrayName);
    this.dialog.closeAll();
  }

}
