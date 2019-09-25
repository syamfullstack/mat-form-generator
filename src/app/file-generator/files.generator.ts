import { componentGenerator } from './component.generator';
import { getHtmlContent } from './html.generator';

export const outputFormat = () => ({
	componentSection: {
		importSection: {
			coreSection: {
				importFrom: '@angular/core',
				contents: 'Component, OnInit'
			},
			formSection: {
				importFrom: '@angular/forms',
				contents: 'FormGroup, FormBuilder'
			}
		},
		selectorSection: null,
		classSection: {
			classHeader: null,
			classContent: {
				declerationPart: '\n\tinputFormGroup: FormGroup;\n\tinputData: any = <any>{};',
				constructorSection: null,
				ngOnitSection: null,
				inputBindingSection: '',
				methods: ''
			},
			classFooter: null
        },
        fileContent: ''
	}
});

export const fileGenerator = (input) => {
	const file = {
		component: componentGenerator(input, outputFormat()),
		html: getHtmlContent(input)
	}
	return file;
};
