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
    }];

    selectedControls: any[] = [];
    inputFormGroup: FormGroup;
    selectedSettings: any;

  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.inputFormGroup = this.formBuilder.group({});
  }

  drop(event: CdkDragDrop<string[]>) {
    debugger;
    // if (event.previousContainer === event.container) {
    //   moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    // } else {
    //   transferArrayItem(event.previousContainer.data,
    //                     event.container.data,
    //                     event.previousIndex,
    //                     event.currentIndex);
    // }
    if (event.item.data) {
      const control = { ...event.item.data };
      control.propertyName = control.propertyName +
        (+this.selectedControls.filter(a => a.inputType === control.inputType).length + 1);
      control.displayName = control.propertyName;
      this.selectedControls = [...this.selectedControls, control];
      this.createForm();
    }
  }

  createForm() {
    this.selectedControls.forEach(a => {
      if (!this.inputFormGroup.get(a.propertyName)) {
        this.inputFormGroup.addControl(a.propertyName, new FormControl());
      }
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

}
