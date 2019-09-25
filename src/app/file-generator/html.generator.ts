export const getHtmlContent = (input) => {
    let template = {
        header: null,
        content: null,
        footer: null
    };
    if (input.formData.settings.formType === 'material') {
        template = {...matForm};
    }
    
    const controls = Object.values(input.formData.controls);
    debugger;
    controls.forEach((control: any, i) => {
        if (input.formData.settings.formType === 'material') {
            if (control.formGroupName) {
                const formGroupWrapper = {...matFormGroupWrapper};
                formGroupWrapper.header = formGroupWrapper.header.replace('{{formGroupTitle}}', control.displayName);
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                // formGrouop controls
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                const formGroupControls = Object.values(control.controls);
                const formGroupName = `${control.formGroupName.charAt(0).toUpperCase() + control.formGroupName.substring(1)}`;
                formGroupControls.forEach((formGroupControl: any) => {
                    if (!formGroupControl.isFormControlOnly) {
                        let htmlControl = getMaterialControls(formGroupControl, '\n\t\t\t', `inputFormGroup.get('${control.formGroupName}').controls.${formGroupControl.propertyName}`);
                        formGroupWrapper.content += '\n\n' + htmlControl;
                    } 
                });
                const formGroupContent = '\n\n\t\t\t' + formGroupWrapper.header + formGroupWrapper.content + '\n\t\t\t' + formGroupWrapper.footer;
                template.content += formGroupContent;
            } else if (control.formArrayName && control.controls.length) {
                const formArrayWrapper = {...matFormArrayWrapper};
                formArrayWrapper.header = '\n\n\t\t\t' + formArrayWrapper.header.replace('{{formArrayTitle}}', control.displayName);
                formArrayWrapper.header = formArrayWrapper.header.replace('{{formGroup}}', control.formArrayName + 'FormGroup');
                formArrayWrapper.header = formArrayWrapper.header.replace('{{formArrayControlName}}', control.formArrayName);
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                // formArrayControls
                const formArrayControls = Object.values(control.controls[0]);
                const formArrayName = `${control.formArrayName.charAt(0).toUpperCase() +
                    control.formArrayName.substring(1)}`;
                formArrayControls.forEach((formArrayControl: any) => {
                    if (!formArrayControl.isFormControlOnly) {
                        let htmlControl = getMaterialControls(formArrayControl, '\n\t\t\t\t', `${control.formArrayName + 'FormGroup'}.get('${formArrayControl.propertyName}')`);
                        formArrayWrapper.content += htmlControl;
                    }
                });
                formArrayWrapper.content += '\n\t\t\t\t' + matFormArrayWrapper.addButton.replace('{{method}}', `add${formArrayName}`).replace('{{buttonTitle}}', `Add ${formArrayName}`);
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

                const formArrayContent = '\n\t\t\t' + formArrayWrapper.header + formArrayWrapper.content + '\n\t\t\t' + formArrayWrapper.footer;
                template.content += formArrayContent;
            } else {
                if (!control.isFormControlOnly) {
                    let htmlControl = getMaterialControls(control, '\n\t\t\t', `inputFormGroup.get('${control.propertyName}')`);
                    template.content+= '\n\n' + htmlControl;
                }
            }
        }
    });
    console.log(template.header + template.content + template.footer);
    // console.log(matForm.content);
    // console.log(matForm.footer);
    return (template.header + template.content + template.footer);
};

export const getHtmlForControls = {};

export const getMaterialControls = (control, sSpace, formControl) => {
    let controlHtml = '';
    switch (control.inputType) {
        case 'textBox':
            controlHtml = `${sSpace + matControls.matFormField}${sSpace + '\t' +matControls.label}${sSpace + '\t' +matControls.input}${sSpace + matControls.matFormFieldClose}`;
            controlHtml = controlHtml.replace('{{label}}', control.displayName);
            break;
        case 'textArea':
            controlHtml = `${sSpace + matControls.matFormField}${sSpace + '\t' +matControls.label}${sSpace + '\t' +matControls.inputTextArea}${sSpace + matControls.matFormFieldClose}`;
            controlHtml = controlHtml.replace('{{label}}', control.displayName);
            break;
        case 'selectBox':
            controlHtml = `${sSpace + matControls.matFormField}${sSpace + '\t' +matControls.label + sSpace}\t${matControls.select.select + sSpace + '\t\t'}${matControls.select.option + sSpace + '\t' + matControls.select.close}${sSpace + matControls.matFormFieldClose}`;
            controlHtml = controlHtml.replace('{{label}}', control.displayName);
            controlHtml = controlHtml.replace('{{list}}', control.propertyName + 'List');
            controlHtml = controlHtml.replace('{{optionValue}}', control.valueField ? `option.${control.valueField}`: 'option');
            controlHtml = controlHtml.replace('{{optionText}}', control.displayField ? `{{option.${control.displayField}}}`: '{{option}}');
            break;
        case 'dateBox':
            controlHtml = `${sSpace + matControls.matFormField}${sSpace + '\t' +matControls.label + sSpace}\t${matControls.date.date + sSpace}\t${matControls.date.matDate + sSpace}\t${matControls.date.matDatePickerType}${sSpace + matControls.matFormFieldClose}`;
            controlHtml = controlHtml.replace('{{label}}', control.displayName);
            break;
        case 'toggle':
            controlHtml = `${sSpace + matControls.toggle}`;
            controlHtml = controlHtml.replace('{{toggleDisplayName}}', control.displayName);
            break;
        case 'checkBox':
            controlHtml = `${sSpace + matControls.checkBox}`;
            controlHtml = controlHtml.replace('{{checkBoxDisplayName}}', control.displayName);
            break;
        case 'radioButton':
            controlHtml = `${sSpace + matControls.radio.radioGroup}${sSpace + '\t' + matControls.radio.radioButton }${sSpace + matControls.radio.radioGroupClose}`
            controlHtml = controlHtml.replace('{{list}}', control.propertyName + 'List');
            controlHtml = controlHtml.replace('{{value}}', control.valueField ? `option.${control.valueField}`: 'option');
            controlHtml = controlHtml.replace('{{displayText}}', control.displayField ? `option.${control.displayField}`: 'option');
            break;
        case 'multiSelect':
            controlHtml = `${sSpace + matControls.matFormField}${sSpace + '\t' +matControls.multiSelect.matSelect}${sSpace + '\t\t' + matControls.multiSelect.matSelectTrigger}${sSpace + matControls.multiSelect.matSelectTriggerContent}${sSpace + '\t\t' + matControls.multiSelect.matSelectTriggerClose}${sSpace + '\t\t'+ matControls.select.option}${sSpace + '\t' + matControls.multiSelect.matSelectClose}${sSpace + matControls.matFormFieldClose}`
            controlHtml = controlHtml.replace('{{label}}', control.displayName);
            controlHtml = controlHtml.replace('{{list}}', control.propertyName + 'List');
            controlHtml = controlHtml.replace('{{optionValue}}', control.valueField ? `option.${control.valueField}`: '{{option}}');
            controlHtml = controlHtml.replace('{{optionText}}', control.displayField ? `{{option.${control.displayField}}}`: '{{option}}');
            break;
    }
    return controlHtml.replace(/{{formControlName}}/gi, formControl);
};

export const matControls = {
    matFormField: '<mat-form-field class="custom-form-field" appearance="outline">',
    matFormFieldClose: '</mat-form-field>',
    label: '<mat-label>{{label}}</mat-label>',
    input: `<input matInput [formControl]="{{formControlName}}">`,
    inputTextArea: '<textarea matInput [formControl]="{{formControlName}}"></textarea>',
    select: {
        select: '<mat-select [formControl]="{{formControlName}}">',
        option: '<mat-option *ngFor="let option of {{list}}" [value]="{{optionValue}}">{{optionText}}</mat-option>',
        close: '</mat-select>'
    },
    date: {
        date:  '<input matInput [matDatepicker]="picker1" [formControl]="{{formControlName}}">',
        matDate: '<mat-datepicker-toggle matSuffix [for]="picker1"></mat-datepicker-toggle>',
        matDatePickerType: '<mat-datepicker #picker1></mat-datepicker>'
    },
    toggle: '<mat-slide-toggle class="custom-toggle" [formControl]="{{formControlName}}">{{toggleDisplayName}}</mat-slide-toggle>',
    checkBox: '<mat-checkbox class="custom-checkbox" [formControl]="{{formControlName}}">{{checkBoxDisplayName}}</mat-checkbox>',
    radio: {
        radioGroup: '<mat-radio-group aria-label="Select an option" [formControl]="{{formControlName}}">',
        radioGroupClose: '</mat-radio-group>',
        radioButton: '<mat-radio-button class="custom-radio-button" *ngFor="let option of {{list}}" value="{{value}}">{{displayText}}</mat-radio-button>'

    },
    multiSelect: {
        matSelect: '<mat-select placeholder="{{label}}" [formControl]="{{formControlName}}" multiple>',
        matSelectClose: '</mat-select>',
        matSelectTrigger: `<mat-select-trigger>`,
        matSelectTriggerContent: `{{{{formControlName}}.value ? {{formControlName}}.value[0] : ''}}<span *ngIf="{{formControlName}}.value?.length > 1" class="example-additional-selection">(+{{{{formControlName}}.value.length - 1}}{{{{formControlName}}.value?.length === 2 ? 'other' : 'others'}})</span>`,
        matSelectTriggerClose: '</mat-select-trigger>'
    }


}

export const matForm = {
    header: `
<div class="container pt-5 mb-5 mat-container col col-4" style="margin: 16px;" *ngIf="inputFormGroup">
    <mat-card class="mat-card-block">
        <mat-card-header>
            <mat-card-title class="material-title">{{formTitle}}</mat-card-title>
        </mat-card-header>
        <mat-divider></mat-divider>
        <mat-card-content  class="content-position">`,
    content: '',
    footer: `\n\t\t</mat-card-content>\n\t</mat-card>\n</div>\n<pre *ngIf="inputFormGroup">{{inputFormGroup.value | json}}</pre>`
}

export const matFormArrayWrapper = {
    header: `<h6>{{formArrayTitle}}</h6>\n\t\t\t<ng-container *ngFor="let {{formGroup}} of inputFormGroup.get('{{formArrayControlName}}').controls">`,
    content: '',
    footer: '</ng-container>',
    addButton: '<button mat-button (click)="{{method}}()">{{buttonTitle}}</button>'
}

export const matFormGroupWrapper = {
    header: '<h6>{{formGroupTitle}}</h6>',
    content: '',
    footer: ''
};

// <mat-form-field class="custom-form-field" appearance="outline" cdkDrag>
//           <mat-select placeholder="{{data.displayName}}" [formControl]="inputFormGroup.get(data.propertyName)" multiple>
//             <mat-select-trigger>
//               {{inputFormGroup.get(data.propertyName).value ? inputFormGroup.get(data.propertyName).value[0] : ''}}
//               <span *ngIf="inputFormGroup.get(data.propertyName).value?.length > 1" class="example-additional-selection">
//                 (+{{inputFormGroup.get(data.propertyName).value.length - 1}}
//                 {{inputFormGroup.get(data.propertyName).value?.length === 2 ? 'other' : 'others'}})
//               </span>
//             </mat-select-trigger>
//             <mat-option *ngFor="let option of data.inputArray"
//               [value]="data.valueField ? option[data.valueField] : option">
//               {{data.displayField ? option[data.displayField] : option}}
//             </mat-option>
//           </mat-select>
//         </mat-form-field>
