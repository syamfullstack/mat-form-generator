import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-material-form',
  templateUrl: './material-form.component.html',
  styleUrls: ['./material-form.component.scss']
})

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

export class MaterialFormComponent implements OnInit {
  inputFormGroup: FormGroup;
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.inputFormGroup = this.formBuilder.group({
      input: [null, Validators.required],
      textArea: [null, Validators.required],
      selectBox: [null, Validators.required],
      date: [null, Validators.required],
      time: [null, Validators.required],
      radioType: [null, Validators.required],
      toggle: [null, Validators.required],
      check: [null, Validators.required],
      multiSelect: [[], Validators.required],
    });
  }

}
