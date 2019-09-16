import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef, AfterViewInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-global-form-settings',
  templateUrl: './global-form-settings.component.html',
  styleUrls: ['./global-form-settings.component.scss']
})
export class GlobalFormSettingsComponent implements OnInit, AfterViewInit {
  settingsFormGroup: FormGroup;
  @Input() globalSettings: any = {};
  //  @Output('onSubmit') submit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('settings', { static: false }) settingsRef: TemplateRef<any>;

  constructor(public dialog: MatDialog, @Inject('Action') public action: any, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.settingsFormGroup = this.formBuilder.group({
      formTitle: [this.globalSettings.formTitle, [Validators.required]],
      componentFileName: [this.globalSettings.componentFileName, [Validators.required]],
      componentName: [this.globalSettings.componentName, [Validators.required]],
      buttons: this.formBuilder.group({
        okButtonTitle: [this.globalSettings.buttons.okButtonTitle, [Validators.required]],
        cancelButtonTitle: [this.globalSettings.buttons.cancelButtonTitle, [Validators.required]]
      })
    });
  }

  ngAfterViewInit() {
    this.dialog.open(this.settingsRef, {
      width: '400px',
      data: { index: null }
    });
  }

  onSubmitSettings() {
    // this.submit.emit(this.globalSettings);
    if (this.settingsFormGroup.valid) {
      this.action.ok(this.settingsFormGroup.value);
      this.dialog.closeAll();
    }
  }

  closeSettings() {
    this.action.cancel();
    this.dialog.closeAll();
  }

}
