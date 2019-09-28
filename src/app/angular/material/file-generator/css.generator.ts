export const commonCss = `
.mat-container {
    width: 400px;
  }
  
  .custom-form-field {
    width: 100%;
  }
  
  .content-position {
    padding-top: 25px;
  }
`;

export const radioButtonCss = `
.custom-radio-button.mat-radio-button {
    display: block !important;
  
    label.mat-radio-label {
      width: auto;
    }
  }
`;

export const checkBoxCss = `
.custom-checkbox mat-checkbox {
    display: block !important;
    cursor: default;
  
    label.mat-checkbox-layout {
      cursor: pointer;
    }
  }
`;

export const toggleCsss = `
.custom-toggle {
    display: block !important;
}
`;

export const getCssClassContent = (controlTypes) => {
    let commonCssClass = commonCss;
    controlTypes.forEach(type => {
        switch(type) {
            case 'toggle':
                    commonCssClass += '\n' + toggleCsss;
                break;
            case 'radioButton':
                    commonCssClass += '\n' + radioButtonCss;
                break;
            case 'checkBox':
                    commonCssClass += '\n' + checkBoxCss;
                break;
        }
    });
    return commonCssClass;
};