import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-preview-form',
  templateUrl: './preview-form.component.html',
  styleUrls: ['./preview-form.component.scss']
})
export class PreviewFormComponent implements OnInit, OnChanges {

  @Input() selectedControls: any;
  @Input() settings: string;
  inputFormGroup: FormGroup;
  matcher = new MyErrorStateMatcher();
  @Output('setPreviewFormGroup') setPreviewFormGroupEmitter = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedControls && changes.selectedControls.currentValue) {
      this.inputFormGroup = null;
      this.createForm();
        setTimeout(() => {
      });
    }
  }

  createForm() {
    // const controls = Object.values(this.selectedControls1);
    this.inputFormGroup = this.formBuilder.group({});
    this.selectedControls.forEach((control: any) => {
      if (control.formGroupName) {
        // write a common fn
        const formGroup = this.formBuilder.group({});
        (control.controls).forEach((control: any) => {
          formGroup.addControl(control.propertyName, new FormControl(null, control.required ?  Validators.required : null));
        });
        this.inputFormGroup.addControl(control.formGroupName, formGroup);
      } else if (control.formArrayName) {
        const formArray = this.formBuilder.array([]);

        control.controls.forEach((formArrayControls: any) => {
          const formGroup = this.formBuilder.group({});
          // formGroup.addControl(formArrayControls.propertyName, new FormControl());
          // write a common fn
          (formArrayControls || []).forEach((control: any) => {
            formGroup.addControl(control.propertyName, new FormControl(null, control.required ?  Validators.required : null));
          });
          formArray.push(formGroup);
        });
        this.inputFormGroup.addControl(control.formArrayName, formArray);
      } else {
        this.inputFormGroup.addControl(control.propertyName, new FormControl(null, control.required ?  Validators.required : null));
      }
    });
    this.setPreviewFormGroupEmitter.emit(this.inputFormGroup);
  }
  
}
