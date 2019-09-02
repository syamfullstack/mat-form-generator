import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

const ELEMENT_DATA: any[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-mat-form-generator',
  templateUrl: './mat-form-generator.component.html',
  styleUrls: ['./mat-form-generator.component.css']
})
export class MatFormGeneratorComponent implements OnInit {

  inputJson: FormControl = new FormControl();
  displayedColumns: string[] = ['propertyName', 'inputType', 'inputArray', 'valueField', 'displayField', 'required'];
  dataSource = [];
  inputTypes: string[] = ['textbox', 'select', 'radio', 'checkbox', 'datebox'];

  inputFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.inputJson.valueChanges.subscribe((data: string) => {
      const columns = [];
      try {
        const keys = Object.keys(JSON.parse(data));
        keys.forEach((key: string) => {
          columns.push({
            propertyName: key,
            inputType: null,
            inputArray: null,
            valueField: null,
            displayField: null,
            required: true
          });
        });
        this.dataSource = columns;
      }
      catch(ex) {

      }
      
    });
  }

  addRow() {
    this.dataSource = [...this.dataSource, {
      propertyName: null,
      inputType: null,
      inputArray: null,
      valueField: null,
      displayField: null,
      required: true
    }];
  }

  createForm() {
    this.inputFormGroup = this.formBuilder.group({});
    this.dataSource.forEach(a => {
      if (!this.inputFormGroup.get(a.propertyName)) {
        this.inputFormGroup.addControl(a.propertyName, new FormControl());
      }
    });
    setTimeout(() => {
      // this.cdr.detectChanges();
    });
  }

}
