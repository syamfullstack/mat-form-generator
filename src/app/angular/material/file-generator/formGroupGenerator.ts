export const formGroupGenerator = (data) => {
    debugger;
    const values = Object.values(data);
    const pageBreak = '\t\t';
    let initBody = pageBreak + 'this.inputFormGroup = this.formBuilder.group({';
    const initBodyClose = `\n${pageBreak}});`;
    let formGroupBody = '';
    values.forEach((control: any) => {
        if (control.formGroupName) {
            const childFormGroup = `\n\t${pageBreak + control.formGroupName}: this.formBuilder.group({`;
            let childFormGroupBody = '';
            const childFormGroupValues = Object.values(control.controls);
            childFormGroupValues.forEach((childControl: any) => {
                childFormGroupBody = childFormGroupBody + `\n\t\t${pageBreak +  childControl.propertyName}: 
                    [this.inputData.${childControl.propertyName}${childControl.required ? ', Validators.required': '' }],`
            });
            formGroupBody = formGroupBody + childFormGroup +  childFormGroupBody + `\n\t${pageBreak}}),`;

        } else if (control.formArrayName) {
            const childFormArray = '\n' + pageBreak + `\t${control.formArrayName}: this.formBuilder.array(\n\t\t${pageBreak}(this.inputData.${control.formArrayName} || []).map((data: any) =>
            ${pageBreak}this.formBuilder.group({`;
            let childFormGroupBody = '';
            control.controls.forEach((formArrayControl: any) => {
                formArrayControl = Object.values(formArrayControl);
                formArrayControl.forEach((childControl: any) => {
                    childFormGroupBody = childFormGroupBody + `\n\t\t\t\t${pageBreak + childControl.propertyName}: [this.inputData.${childControl.propertyName}${childControl.required ? ', Validators.required': '' }],`
                });
            });
            formGroupBody = formGroupBody + childFormArray + childFormGroupBody + `\n\t\t\t${pageBreak}});` + `\n\t\t${pageBreak}});` + `\n\t${pageBreak}}),`;
        } else {
            formGroupBody = formGroupBody + `\n\t${pageBreak + control.propertyName}: [this.inputData.${control.propertyName}${control.required ? ', Validators.required': '' }],`
        }
    });
    debugger;
    initBody = initBody + formGroupBody + initBodyClose;
    initBody = `\tcreateForm() {\n` + initBody + '\n\t}';
    console.log(initBody);
};
