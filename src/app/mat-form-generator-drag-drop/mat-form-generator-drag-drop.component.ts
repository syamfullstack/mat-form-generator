import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-mat-form-generator-drag-drop',
  templateUrl: './mat-form-generator-drag-drop.component.html',
  styleUrls: ['./mat-form-generator-drag-drop.component.css']
})
export class MatFormGeneratorDragDropComponent implements OnInit {
  controls = [{
    propertyName: 'textBox',
    inputType: 'textBox',
    displayName: null,
    inputArray: null,
    valueField: null,
    displayField: null,
    required: true,
    openSettings: false
  },
  {
    propertyName: 'textArea',
    inputType: 'textArea',
    displayName: null,
    inputArray: null,
    valueField: null,
    displayField: null,
    required: true,
    openSettings: false
  },
  {
    propertyName: 'selectBox',
    inputType: 'selectBox',
    displayName: null,
    inputArray: null,
    valueField: null,
    displayField: null,
    required: true,
    openSettings: false
  },
  {
    propertyName: 'datebox',
    inputType: 'dateBox',
    displayName: null,
    inputArray: null,
    valueField: null,
    displayField: null,
    required: true,
    openSettings: false
  },
  {
    propertyName: 'toggle',
    inputType: 'toggle',
    displayName: null,
    inputArray: null,
    valueField: null,
    displayField: null,
    required: true,
    openSettings: false
  },
  {
    propertyName: 'checkBox',
    inputType: 'checkBox',
    displayName: null,
    inputArray: null,
    valueField: null,
    displayField: null,
    required: true,
    openSettings: false
  },
  {
    propertyName: 'radioButton',
    inputType: 'radioButton',
    displayName: null,
    inputArray: null,
    valueField: null,
    displayField: null,
    required: true,
    openSettings: false
  }];


  selectedControls: any[] = [];
  inputFormGroup: FormGroup;
  selectedSettings: any;

  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.inputFormGroup = this.formBuilder.group({});
  }

  drop1(event: CdkDragDrop<string[]>) {
    // moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.item.data) {
      const control = { ...event.item.data };
      control.propertyName = control.propertyName +
        (+this.selectedControls.filter(a => a.inputType === control.inputType).length + 1);
      control.displayName = control.propertyName;
      this.selectedControls = [...this.selectedControls, control];
      // const selectedControls = [...this.selectedControls];
      // this.selectedControls = [...selectedControls.splice(0, (event.currentIndex - 1)), control,
      //     ...selectedControls.splice(event.currentIndex, selectedControls.length)];
      this.createForm();
    } else {
      moveItemInArray(this.selectedControls, event.previousIndex, event.currentIndex);
      // this.inputFormGroup = this.formBuilder.group({});
      this.createForm();
    }
  }

  createForm() {
    this.selectedControls.forEach(a => {
      if (!this.inputFormGroup.get(a.propertyName)) {
        this.inputFormGroup.addControl(a.propertyName, new FormControl());
      }
      this.inputFormGroup.setControl(a.propertyName, this.inputFormGroup.get(a.propertyName));
    });
    setTimeout(() => {
      this.cdr.detectChanges();
    });
  }

  openSettings(index) {
    this.selectedSettings = { ...this.controls[index] };
    this.selectedControls[index].openSettings = true;
  }

  closeSettings(index) {
    this.selectedControls[index].openSettings = false;
    this.selectedSettings = null;
  }

  applySettings(index) {
    this.selectedControls[index] = this.selectedSettings;
    this.inputFormGroup = this.formBuilder.group({});
    this.createForm();
  }

  getInputArray(item) {
    return [];
  }

}
