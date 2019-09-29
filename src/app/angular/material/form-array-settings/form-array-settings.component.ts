import { Component, OnInit, Input, EventEmitter, Output, TemplateRef, ViewChild, SimpleChanges } from '@angular/core';
import { ErrorStateMatcher, MatDialog } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-form-array-settings',
  templateUrl: './form-array-settings.component.html',
  styleUrls: ['./form-array-settings.component.scss']
})
export class FormArraySettingsComponent implements OnInit {
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
