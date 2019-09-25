export const data = {
   formGroup1: {
      displayName: "formGroup1",
      formArrayName: null,
      formGroupName: "formGroup1",
      controls: {
         "textBox1": {
            propertyName: "textBox1",
            "inputType": "textBox",
            "displayName": "textBox1",
            "inputArray": null,
            "valueField": null,
            "displayField": null,
            "required": true,
            "openSettings": false,
            "selected": true
         },
         "textArea1": {
            propertyName: "textArea1",
            "inputType": "textArea",
            "displayName": "textArea1",
            "inputArray": null,
            "valueField": null,
            "displayField": null,
            "required": true,
            "openSettings": false,
            "selected": false
         }
      }
   },
   "formArray1": {
      "displayName": "formArray1",
      "formArrayName": "formArray1",
      "controls": [
         {
            "selectBox1": {
               propertyName: "selectBox1",
               "inputType": "selectBox",
               "displayName": "selectBox1",
               "inputArray": [

               ],
               "valueField": null,
               "displayField": null,
               "required": true,
               "openSettings": false,
               "selected": true
            },
            "datebox1": {
               propertyName: "datebox1",
               "inputType": "dateBox",
               "displayName": "datebox1",
               "inputArray": null,
               "valueField": null,
               "displayField": null,
               "required": true,
               "openSettings": false,
               "selected": true
            }
         }
      ]
   },
   "multiSelect1": {
      propertyName: "multiSelect1",
      "inputType": "multiSelect",
      "displayName": "multiSelect1",
      "inputArray": [
         "Option 1",
         "Option 2",
         "Option 3",
         "Option 4",
         "Option 5"
      ],
      "valueField": null,
      "displayField": null,
      "required": true,
      "openSettings": false,
      "selected": false
   },
   "multiSelect2": {
      propertyName: "multiSelect2",
      "inputType": "multiSelect",
      "displayName": "multiSelect2",
      "inputArray": [
         "Option 1",
         "Option 2",
         "Option 3",
         "Option 4",
         "Option 5"
      ],
      "valueField": null,
      "displayField": null,
      "required": false,
      "openSettings": false,
      "selected": false
   }
}

export const data2 = {
   "textBox1": {
      "inputType": "textBox",
      "displayName": "Name",
      "propertyName": "name",
      "inputArray": null,
      "valueField": null,
      "displayField": null,
      "required": true
   },
   "date": {
      "inputType": "dateBox",
      "displayName": "Date",
      "propertyName": "date",
      "inputArray": null,
      "valueField": null,
      "displayField": null,
      "required": true
   },
   "about": {
      "inputType": "textArea",
      "displayName": "About",
      "propertyName": "about",
      "inputArray": null,
      "valueField": null,
      "displayField": null,
      "required": true
   },
   "emails": {
      "displayName": "emails",
      "formArrayName": "emails",
      "controls": [
         {
            "textBox2": {
               "inputType": "textBox",
               "displayName": "Email",
               "propertyName": "email",
               "inputArray": null,
               "valueField": null,
               "displayField": null,
               "required": true
            }
         }
      ]
   },
   "radioButton1": {
      "inputType": "radioButton",
      "displayName": "Gender",
      "propertyName": "gender",
      "inputArray": [
         "male",
         "female"
      ],
      "valueField": null,
      "displayField": null,
      "required": true
   },
   "multiSelect1": {
      "inputType": "multiSelect",
      "displayName": "Select Interests",
      "propertyName": "interests",
      "inputArray": [
         {
            "id": 1,
            "name": "Cricket",
            "val": [1,2,3],
            "data": {
               "id": 1,
               "ds": 'sdsdsd'
            }
         },
         {
            "id": 2,
            "name": "Football",
            "val": [1,2,3],
            "data": {
               "id": 1,
               "ds": 'sdsdsd'
            }
         },
         {
            "id": 3,
            "name": "Chess",
            "val": [1,2,3],
            "data": {
               "id": 1,
               "ds": 'sdsdsd'
            }
         }
      ],
      "valueField": "id",
      "displayField": "name",
      "required": true
   },
   "checkBox1": {
      "inputType": "checkBox",
      "displayName": "active",
      "propertyName": "active",
      "inputArray": null,
      "valueField": null,
      "displayField": null,
      "required": true
   },
   "address": {
      "displayName": "address",
      "formArrayName": null,
      "formGroupName": "address",
      "controls": {
         "permanant": {
            "inputType": "toggle",
            "displayName": "permanant",
            "propertyName": "permanant",
            "inputArray": null,
            "valueField": null,
            "displayField": null,
            "required": true
         },
         "zip": {
            "inputType": "textBox",
            "displayName": "Zip",
            "propertyName": "zip",
            "inputArray": null,
            "valueField": null,
            "displayField": null,
            "required": true
         },
         "state": {
            "inputType": "selectBox",
            "displayName": "State",
            "propertyName": "state",
            "inputArray": [
               "Kerala",
               "Tamilnadu"
            ],
            "valueField": null,
            "displayField": null,
            "required": true
         },
         "country": {
            "inputType": "selectBox",
            "displayName": "Country",
            "propertyName": "country",
            "inputArray": [
               {
                  "id": 1,
                  "name": "India"
               },
               {
                  "id": 2,
                  "name": "US"
               }
            ],
            "valueField": "id",
            "displayField": "name",
            "required": true
         }
      }
   }
};

export const pages = [{
   pageName: 'Home1111',
   settings: {
     componentFileName: 'mat-form-generator',
     componentName: 'MatFormGenerator'
   },
   formData: {
     settings: {
       formTitle: 'Material Form',
       buttons: {
         okButtonTitle: 'Ok',
         cancelButtonTitle: 'Cancel'
       },
       formType: 'material'
     },
     controls: null
   }
 }];
