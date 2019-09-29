import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatDialog, ErrorStateMatcher } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-form-group-settings',
  templateUrl: './form-group-settings.component.html',
  styleUrls: ['./form-group-settings.component.scss']
})
export class FormGroupSettingsComponent implements OnInit, OnChanges {
  @Input() show: boolean = false;
  inputFormGroup: FormGroup;
  matcher = new MyErrorStateMatcher();
  @Output('onSubmit') onSubmit = new EventEmitter<any>();
  @Output('onClose') onClose = new EventEmitter<any>();
  @ViewChild('settings', { static: false }) settingsRef: TemplateRef<any>;

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.show.currentValue) {
      this.open();
    } else {
      this.close();
    }
  }

  createForm() {
    this.inputFormGroup = this.formBuilder.group({
      propertyName: [null, Validators.required],
      displayName: [null, Validators.required],
    });
  }

  open() {
    this.createForm();
    this.dialog.open(this.settingsRef, {
      width: '400px',
      data: { index: null }
    });
  }

  close() {
    this.dialog.closeAll();
  }

  cancel () {
    this.onClose.emit(true);
  }

  onSubmitForms() {
    if (this.inputFormGroup.valid) {
      this.onSubmit.emit(this.inputFormGroup.value);
    }
  }
}
