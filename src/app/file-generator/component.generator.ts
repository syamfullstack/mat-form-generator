export const componentGenerator = (input, outputFormat) => {
	const componentSection = outputFormat.componentSection;
    findClassSection(componentSection.importSection.formSection, componentSection.classSection, input);
    let importSection = `import { ${componentSection.importSection.coreSection.contents} } from '${componentSection.importSection.coreSection.importFrom}';`;
    importSection = importSection +  `\nimport { ${componentSection.importSection.formSection.contents} } from '${componentSection.importSection.formSection.importFrom}';`;

    /// add import content to file content
    outputFormat.componentSection.fileContent = importSection + '\n\n';

    // add Selector section
    outputFormat.componentSection.fileContent += `\n@Component({
    selector: 'app-${input.settings.componentFileName}',
    templateUrl: './${input.settings.componentFileName}.component.html',
    styleUrls: ['./${input.settings.componentFileName}.component.css']\n})`;
    // add class header
    outputFormat.componentSection.fileContent += outputFormat.componentSection.classSection.classHeader + '\n';

	// add declarations
	// add formtitle in declaration
	outputFormat.componentSection.classSection.classContent.declerationPart += `\n\tformTitle: string = '${input.formData.settings.formTitle}';`;
    outputFormat.componentSection.fileContent += outputFormat.componentSection.classSection.classContent.declerationPart + '\n';

    // add constructor
    outputFormat.componentSection.fileContent += `\n\tconstructor(private formBuilder: FormBuilder) { }\n`;

	// add methodes
	
	// outputFormat.componentSection.fileContent += outputFormat.componentSection.classSection.classContent.ngOnitSection;
	if (outputFormat.componentSection.classSection.classContent.inputBindingSection && outputFormat.componentSection.classSection.classContent.inputBindingSection !== '') {
		outputFormat.componentSection.fileContent += `\n\tngOnInit() {\n\t\tthis.createForm();\n\t\tthis.addInputBindings();\n\t}`;
		outputFormat.componentSection.fileContent += `\n\n\taddInputBindings() {\t${outputFormat.componentSection.classSection.classContent.inputBindingSection}\n\t}`;
	} else {
		outputFormat.componentSection.fileContent += `\n\tngOnInit() {\n\t\tthis.createForm();\n\t}`;
	}
    outputFormat.componentSection.fileContent += '\n\n' + outputFormat.componentSection.classSection.classContent.methods;

    outputFormat.componentSection.fileContent += outputFormat.componentSection.classSection.classFooter + '\n';
	// console.log(outputFormat.componentSection.fileContent);
	return outputFormat.componentSection.fileContent;

};

export const findClassSection = (formSection, classSection, input) => {
	classSection.classHeader = `\n\nexport class ${input.settings.componentName+'Component'} implements OnInit {`;
	classSection.classFooter = '\n}';
	findClassContent(formSection, classSection.classContent, input.formData.controls);
};

export const findClassContent = (formSection, classContent, controls) => {
	// classContent.ngOnitSection = `\n\tngOnInit() {\n\t\tthis.createForm();\n\t\tthis.addInputBindings();\n\t}`;
	// classContent.ngOnitSection = `\n\t\tthis.createForm();`;
	createForm(formSection, classContent, controls);
};

export const createForm = (formSection, classContent, controls) => {
	const values = Object.values(controls);
	const pageBreak = '\t\t';
	let initBody = pageBreak + 'this.inputFormGroup = this.formBuilder.group({';
	const initBodyClose = `\n${pageBreak}});`;
	let formGroupBody = '';
	values.forEach((control: any) => {
		if (control.formGroupName) {
			const childFormGroup = `\n\t${pageBreak + control.formGroupName}: this.formBuilder.group({`;
			let childFormGroupBody = '';
			// const childFormGroupValues = Object.values(control.controls);
			control.controls.forEach((childControl: any) => {
                createBindings(childControl, classContent);
                if (!formSection.contents.includes('Validators') && childControl.required) {
                    formSection.contents = formSection.contents + ', ' + 'Validators';
                }
				childFormGroupBody =
					childFormGroupBody +
					`\n\t\t${pageBreak + childControl.propertyName}: [(this.inputData || {}).${childControl.propertyName}${childControl.required? ', Validators.required': ''}],`;
			});
			formGroupBody = formGroupBody + childFormGroup + childFormGroupBody + `\n\t${pageBreak}}),`;
		} else if (control.formArrayName) {
			// import formArary
			if (!formSection.contents.includes('FormArray')) {
				formSection.contents = formSection.contents + ', ' + 'FormArray';
			}

			///////////////////////////////////////////////////////////////////////////
			// add emailList in declaration part
			classContent.declerationPart = classContent.declerationPart + `\n\t${control.formArrayName + 'List'}: any[] = [];`;
			///////////////////////////////////////////////////////////////////////////

			const childFormArray =
				'\n' +
				pageBreak +
				`\t${control.formArrayName}: this.formBuilder.array((this.inputData.${control.formArrayName} || []).map((data: any) =>
            ${pageBreak}this.create${control.formArrayName.charAt(0).toUpperCase() +
					control.formArrayName.substring(1)}FormGroup(data))),`;
			///////////////////////////////////////////////////////////////////////////
			// Create forngroup for formarray
			let childFormGroupBody = '';
			let dataObject = 'const data = {';
			control.controls.forEach((formArrayControl: any) => {
				// formArrayControl = Object.values(formArrayControl);
				formArrayControl.forEach((childControl: any, i) => {
                    if (!formSection.contents.includes('Validators') && childControl.required) {
                        formSection.contents = formSection.contents + ', ' + 'Validators';
                    }
					createBindings(childControl, classContent);
					// dataObject = dataObject + '\n\t\t' + childControl.propertyName + ': null ' + i+1 !== formArrayControl.length ? ',' : '\n\t\t};';
					dataObject =
						dataObject +
						`\n\t\t\t${childControl.propertyName}: null ${i !== formArrayControl.length - 1
							? ','
							: '\n\t\t};'}`;
					childFormGroupBody =
						childFormGroupBody +
						`\n\t\t${pageBreak +
							childControl.propertyName}: [data.${childControl.propertyName}${childControl.required
							? ', Validators.required'
							: ''}],`;
				});
			});
			const propertyName = `${control.formArrayName.charAt(0).toUpperCase() +
				control.formArrayName.substring(1)}`;

			let methods = `create${propertyName}FormGroup(data) {\n\t\treturn this.formBuilder.group({${childFormGroupBody}\n\t\t});\n\t}`;

			//////////////////////////////////////////////////////////////////////////
			// Create a method for adding formGroup for formArray
			const formArray = `const ${control.formArrayName +
				'FormArray'} = this.inputFormGroup.get('${control.formArrayName}') as FormArray;`;
			const formArrayAction = `${control.formArrayName +
				'FormArray'}.push(this.create${control.formArrayName.charAt(0).toUpperCase() +
				control.formArrayName.substring(1)}FormGroup(data));`;
			methods =
				methods +
				`\n\n\tadd${propertyName}() { \n\t\t${dataObject}\n\t\t${formArray}\n\t\t${formArrayAction} \n\t}`;
			classContent.methods = classContent.methods + '\n\t' + methods;

			/////////////////////////////////////////////////////////////////////////
			formGroupBody =
				formGroupBody +
				childFormArray;
				// +
				// `\n\t\t\t${pageBreak}});` +
				// `\n\t\t${pageBreak}});` +
				// `\n\t${pageBreak}}),`;
		} else {
			createBindings(control, classContent);
			formGroupBody =
				formGroupBody +
				`\n\t${pageBreak + control.propertyName}: [this.inputData.${control.propertyName}${control.required
					? ', Validators.required'
					: ''}],`;
		}
	});
	initBody = initBody + formGroupBody + initBodyClose;
	let createForm = `\tcreateForm() {\n` + initBody + '\n\t}';
	classContent.methods = createForm + '\n\t' + classContent.methods;
	// console.log(initBody);
};

export const createBindings = (control, classContent) => {
	if (
		control.inputType === 'selectBox' ||
		control.inputType === 'multiSelect' ||
		control.inputType === 'radioButton'
	) {
        let arrayObjString = '';
		if (control.inputArray.length && typeof control.inputArray[0] === 'object') {
			control.inputArray.forEach((a, l) => {
				arrayObjString = arrayObjString + formatObject(a) + (control.inputArray.length - 1 === l ? '': ',');
            });
            arrayObjString = '[' + arrayObjString + ']';
		} else {
            arrayObjString = JSON.stringify(control.inputArray);
        }
		classContent.declerationPart =
			classContent.declerationPart + `\n\t${control.propertyName + 'List'}: any[] = [];`;
		classContent.inputBindingSection =
			classContent.inputBindingSection +
			`\n\t\tthis.${control.propertyName + 'List = ' + arrayObjString};`;
	}
	// else if (control.inputType === 'multiSelect') {
	//     debugger;

	// } else if (control.inputType === 'radioButton') {
	//     classContent.declerationPart = classContent.declerationPart + `\n\t${control.propertyName + 'List'}: any[] = [];`;
	//     classContent.inputBindingSection = classContent.inputBindingSection + `\n\n${control.propertyName + 'List = ' + JSON.stringify(control.inputArray)}`;
	//     debugger;
	// }
};

export const formatObject = (a, startSpace = '\n\t\t\t{', innerspace= '\n\t\t\t\t', endSpace= '\n\t\t\t}') => {
	let objString = startSpace;
	const keys = Object.keys(a);
	keys.forEach((b) => {
		let objVal = typeof a[b] === 'string' ? `'${a[b]}'` : a[b];
		if (typeof a[b] === 'string') {
			objVal = `'${a[b]}'`;
		} else if (typeof a[b] === 'object') {
			if (a[b].length && typeof a[b][0] !== 'object') {
				objVal = JSON.stringify(a[b]);
			} else {
				objVal = formatObject(a[b], '{', '\n\t\t\t\t\t', '\n\t\t\t\t}');
			}
		} else {
			objVal = a[b];
		}
		objString = objString + `${innerspace + b}: ${objVal},`;
    });
    objString = objString + endSpace;
	return objString;
};