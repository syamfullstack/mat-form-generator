import {
	Component,
	OnInit,
	ChangeDetectorRef,
	ViewChild,
	ViewContainerRef,
	ComponentFactoryResolver
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators, FormArrayName } from '@angular/forms';
import { MatFormAdvancedSettingsComponent } from '../mat-form-advanced-settings/mat-form-advanced-settings.component';
import { getCustomInjector } from '../utilities/custom-injector';
import { getControls } from '../utilities/controls';
import { GlobalFormSettingsComponent } from '../global-form-settings/global-form-settings.component';
import { pages } from 'src/app/angular/material/file-generator/data';
import { AdvancedSettingsAction } from '../model/advanced-settings.model';

@Component({
	selector: 'app-mat-form-generator-drag-drop',
	templateUrl: './mat-form-generator-drag-drop.component.html',
	styleUrls: [ './mat-form-generator-drag-drop.component.scss' ]
})
export class MatFormGeneratorDragDropComponent implements OnInit {
	controls: any;
	selectedControls: any[] = [];
	inputFormGroup: FormGroup;
	previewFormGroup: FormGroup;
	action: AdvancedSettingsAction = {
		ok: (settings, propertyName, formGroupName, formArryName) =>
			this.applySettings(settings, propertyName, formGroupName, formArryName),
		cancel: (index) => this.closeSettingsModal(index)
	};

	globalSettingsAction: any = {
		ok: (settings) => this.applyGlobalSettings(settings),
		cancel: () => {}
	};

	isFormArray = false;
	isFormGroup = false;
	formArrayName: string;
	formGroupName: string;
	selectedControls1: any = [];
	pages: any;

	selectedGlobalFormSettings: any;

	@ViewChild('settings', { static: true, read: ViewContainerRef })
	settings: ViewContainerRef;
	@ViewChild('globalSettings', { static: true, read: ViewContainerRef })
	globalSettings: ViewContainerRef;

	constructor(private formBuilder: FormBuilder, private componentFactoryResolver: ComponentFactoryResolver) {}

	ngOnInit() {
		// this.selectedControls1 = [
		// 	...[
		// 		{
		// 			propertyName: 'name',
		// 			inputType: 'textBox',
		// 			displayName: 'Name',
		// 			inputArray: null,
		// 			valueField: null,
		// 			displayField: null,
		// 			required: true,
		// 			openSettings: false,
		// 			selected: false,
		// 			isFormControlOnly: false,
		// 			requiredValidationMessage: null
		// 		}
		// 	]
		// ];
		this.pages = [ ...pages ];
		this.selectedGlobalFormSettings = { ...this.pages[0].formData.settings };
		this.controls = getControls();
		this.inputFormGroup = this.formBuilder.group({});
		// this.createForm();
		// this.generateFile();
	}

	drop(event: CdkDragDrop<string[]>) {
		if (event.item.data) {
			const control = { ...event.item.data };
			control.propertyName =
				control.propertyName +
				(+this.selectedControls.filter((a) => a.inputType === control.inputType).length + 1);
			control.displayName = control.propertyName;
			this.selectedControls = [ ...this.selectedControls, control ];
			this.selectedControls1 = [ ...this.selectedControls1, control ];
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
		// const controls = Object.values(this.selectedControls1);
		this.inputFormGroup = this.formBuilder.group({});
		this.selectedControls1.forEach((control: any) => {
			if (control.formGroupName) {
				// write a common fn
				const formGroup = this.formBuilder.group({});
				control.controls.forEach((control: any) => {
					formGroup.addControl(control.propertyName, new FormControl({ value: null, disabled: true }));
				});
				this.inputFormGroup.addControl(control.formGroupName, formGroup);
			} else if (control.formArrayName) {
				const formArray = this.formBuilder.array([]);

				control.controls.forEach((formArrayControls: any) => {
					const formGroup = this.formBuilder.group({});
					// formGroup.addControl(formArrayControls.propertyName, new FormControl());
					// write a common fn
					(formArrayControls || []).forEach((control: any) => {
						formGroup.addControl(control.propertyName, new FormControl({ value: null, disabled: true }));
					});
					formArray.push(formGroup);
				});
				this.inputFormGroup.addControl(control.formArrayName, formArray);
			} else {
				this.inputFormGroup.addControl(control.propertyName, new FormControl({ value: null, disabled: true }));
			}
		});
	}

	onSettingsClick(data, formGroupName, formArrayName) {
		this.openSettingsModal(formGroupName, formArrayName, data);
	}

	openSettingsModal(formGroupName, formArrayName, selectedSettings) {
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
			MatFormAdvancedSettingsComponent
		);
		this.settings.clear();
		const componentRef = this.settings.createComponent(componentFactory, 0, getCustomInjector(this.action));
		(componentRef.instance as MatFormAdvancedSettingsComponent).formArrayName = formArrayName;
		(componentRef.instance as MatFormAdvancedSettingsComponent).formGroupName = formGroupName;
		(componentRef.instance as MatFormAdvancedSettingsComponent).selectedSettings = selectedSettings;
	}

	openGlobalFormSettings() {
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(GlobalFormSettingsComponent);
		this.settings.clear();
		const componentRef = this.settings.createComponent(
			componentFactory,
			0,
			getCustomInjector(this.globalSettingsAction)
		);
		(componentRef.instance as GlobalFormSettingsComponent).globalSettings = { ...this.selectedGlobalFormSettings };
	}

	applyGlobalSettings(settings) {
		this.pages[0].formData.settings = this.selectedGlobalFormSettings = { ...settings };
	}

	closeSettingsModal(index) {
		// this.selectedControls[index].openSettings = false;
		this.settings.clear();
	}

	applySettings(settings, propertyName, formGroupName, formArryName) {
		if (formArryName) {
			// const controls = [];
			const formArray = this.selectedControls1.find((a) => a.formArrayName === formArryName);
			if (formArray) {
				formArray.controls.forEach((formArrayControls, i) => {
					let controls = [];
					formArrayControls.forEach((control) => {
						controls.push(control.propertyName === propertyName ? settings : control);
					});
					formArray.controls[i] = [ ...controls ];
				});
			}
			// (this.selectedControls1[formArryName].controls).forEach(controlData => {
			//   const control = {};
			//   Object.keys(controlData).forEach((key => {
			//     if (key !== propertyName) {
			//       control[key] = controlData[key]
			//     } else {
			//       control[settings.propertyName] = settings;
			//     }
			//   }));
			//   controls.push(control);
			// });
			// this.selectedControls1[formArryName].controls = controls;
		} else if (formGroupName) {
			const formGroup = this.selectedControls1.find((a) => a.formGroupName === formGroupName);
			if (formGroup) {
				let controls = [];
				formGroup.controls.forEach((formGroupControl, i) => {
					controls.push(formGroupControl.propertyName === propertyName ? settings : formGroupControl);
				});
				formGroup.controls = [ ...controls ];
			}
			// this.selectedControls1[formGroupName].
			// let control = {};
			// Object.keys(this.selectedControls1[formGroupName].controls).forEach(((key, i) => {
			//   if (key !== propertyName) {
			//     control = {
			//       ...control,
			//       [key]: this.selectedControls1[formGroupName].controls[key],
			//       // sortPosition: i
			//     };
			//   } else {
			//     control = {
			//       ...control,
			//       [settings.propertyName]: settings,
			//       // sortPosition: i
			//     };
			//     // control[settings.propertyName] = settings;
			//   }
			// }));
			// this.selectedControls1[formGroupName].controls = control;
		} else {
			this.selectedControls1.forEach((control, i) => {
				if (control.propertyName === propertyName) {
					this.selectedControls1[i] = settings;
				}
			});
			// const controls = {};
			// this.inputFormGroup = this.formBuilder.group({});
			// Object.keys(this.selectedControls1).forEach((key => {
			//   if (key !== propertyName) {
			//     controls[key] = this.selectedControls1[key]
			//   } else {
			//     controls[propertyName] = settings;
			//   }
			// }));
			// this.selectedControls1 = controls;
			// // delete this.selectedControls1[propertyName];
			// // this.selectedControls1[settings.propertyName] = settings;
		}
		this.selectedControls1 = [ ...this.selectedControls1 ];
		this.createForm();
		this.settings.clear();
	}

	// removeControl(propertyName, index) {
	//   this.inputFormGroup.removeControl(propertyName);
	//   this.selectedControls = this.selectedControls.filter((a, i) => i !== index);
	// }

	createFormArray() {
		const selectedFormArrayControls = this.selectedControls.filter((a) => a.selected);
		const selectedFormArrayControls1 = this.selectedControls1.filter((a: any) => a.selected);
		if (this.isFormArray) {
			this.isFormArray = false;
			let formArray = this.inputFormGroup.get(this.formArrayName) as FormArray;
			if (!formArray) {
				// this.selectedControls1[this.formArrayName] = {
				//   displayName: this.formArrayName,
				//   formArrayName: this.formArrayName,
				//   controls: {}
				// };
				this.inputFormGroup.addControl(this.formArrayName, new FormArray([]));
				formArray = this.inputFormGroup.get(this.formArrayName) as FormArray;
			}
			const formGroup = this.formBuilder.group({});
			let controls = [];
			selectedFormArrayControls1.forEach((a: any) => {
				this.inputFormGroup.removeControl(a.propertyName);
				// this.selectedControls1[this.formArrayName].controls = {
				//   ...this.selectedControls1[this.formArrayName].controls,
				//   [a.propertyName]: this.selectedControls.filter(a => a.propertyName === a.propertyName)
				// };
				// controls = {
				//   ...controls,
				//   [a.propertyName]: this.selectedControls1[a.propertyName]
				// };
				controls.push({ ...a, selected: false });
				// delete this.selectedControls1[a.propertyName];
				this.selectedControls1 = this.selectedControls1.filter((b) => b.propertyName !== a.propertyName);
				// this.selectedControls = this.selectedControls.filter(a => a.propertyName !== a.propertyName);
				formGroup.addControl(a.propertyName, new FormControl());
			});
			// this.selectedControls1[this.formArrayName].controls = [controls];
			this.selectedControls1.push({
				displayName: this.formArrayName,
				formArrayName: this.formArrayName,
				controls: [ controls ]
      });
      this.formArrayName = null;
			formArray.push(formGroup);
		} else if (!this.isFormArray && selectedFormArrayControls1.length) {
			this.isFormArray = true;
		}
	}

	createFormGroup() {
		if (this.isFormGroup) {
			this.isFormGroup = false;
			let formGroup = this.inputFormGroup.get(this.formGroupName) as FormGroup;
			const selectedFormArrayControls1 = Object.values(this.selectedControls1).filter((a: any) => a.selected);
			if (!formGroup) {
				// this.selectedControls1[this.formGroupName] = {
				//   displayName: this.formGroupName,
				//   formArrayName: null,
				//   formGroupName: this.formGroupName,
				//   controls: {}
				// };
				this.inputFormGroup.addControl(this.formGroupName, this.formBuilder.group({}));
				formGroup = this.inputFormGroup.get(this.formGroupName) as FormGroup;
				let controls = [];
				selectedFormArrayControls1.forEach((a: any) => {
					this.inputFormGroup.removeControl(a.propertyName);
					// controls = {
					//   ...controls,
					//   [a.propertyName]: this.selectedControls1[a.propertyName]
					// };
					// delete this.selectedControls1[a.propertyName];
					this.selectedControls1 = this.selectedControls1.filter((b) => b.propertyName !== a.propertyName);
					controls.push({ ...a, selected: false });
					formGroup.addControl(a.propertyName, new FormControl());
				});
				// this.selectedControls1[this.formGroupName].controls = controls;
				this.selectedControls1.push({
					displayName: this.formGroupName,
					formArrayName: null,
					formGroupName: this.formGroupName,
					controls: controls
        });
        this.formGroupName = null;
			}
		} else {
			this.isFormGroup = true;
		}
	}

	// getObjectValuesOfControls(controls) {
	//   return Object.values(controls);
	// }

	deleteControls(propertyName = null, formGroup = null, formArray = null) {
		if (propertyName) {
			if (formGroup) {
				const index = this.selectedControls1.findIndex((a) => a.formGroupName === formGroup);
				if (index !== -1) {
					this.selectedControls1[index] = {
						...this.selectedControls1[index],
						controls: this.selectedControls1[index].controls.filter((a) => a.propertyName !== propertyName)
					};
					if (!this.selectedControls1[index].controls.length) {
						this.selectedControls1 = this.selectedControls1.filter((a) => a.formGroupName !== formGroup);
					}
					this.selectedControls1 = [ ...this.selectedControls1 ];
				}
			} else if (formArray) {
				const index = this.selectedControls1.findIndex((a) => a.formArrayName === formArray);
				if (index !== -1) {
					this.selectedControls1[index] = {
						...this.selectedControls1[index],
						controls: [
							this.selectedControls1[index].controls[0].filter((a) => a.propertyName !== propertyName)
						]
					};
					if (!this.selectedControls1[index].controls[0].length) {
						this.selectedControls1 = this.selectedControls1.filter((a) => a.formArrayName !== formArray);
					}
					this.selectedControls1 = [ ...this.selectedControls1 ];
				}
			} else {
				// Delete control by propertyname
				this.selectedControls1 = this.selectedControls1.filter(a => a.propertyName !== propertyName);
			}
		} else {
			// Delete selected controls
			this.selectedControls1 = this.selectedControls1.filter((a) => !a.selected);
    }
    this.createForm();
	}
	generateFile() {
		this.pages[0].formData.controls = this.selectedControls1;
		this.pages = [ ...this.pages ];
	}

	setPreviewFormGroup($event) {
		this.previewFormGroup = $event;
	}
}
/*
  1. Display corresponding component and its html file => Done
  2. Use array instead of Objects. => Done
  3. Create a preview form => Done
  4. Create css file, test file. => Done
  5. create actions in component. => Done
  6. Align properly. => partially done
  7. Validation message => Done
  8. Clean up
	9. delete , display name for formarray or formgroup
	10. Add inital value for formArrays
	11. Add an add button for form array.

*/
