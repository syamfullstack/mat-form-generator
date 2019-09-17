import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-mat-form-generator',
  templateUrl: './mat-form-generator.component.html',
  styleUrls: ['./mat-form-generator.component.css']
})
export class MatFormGeneratorComponent implements OnInit {

  formTitle: string;
  inputFormGroup: FormGroup;
  inputData: any = {} as any;
  stateList: any = [];
  countryList: any = [];
  genderList: any = [];
  interestsList: any = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    
    this.inputData = {
      name: 'syam',
      emails: [{
          id: 1,
          email: 'syamrc46@gmail.com'
      },{
        id: 2,
        email: 'syampallithode@gmail.com'
      }], // form array
      gender: 'male', // radio
      interests: [1, 2], // multiselect
      active: true, // checkbox
      address: {
        zip: 5555,
        state: 'Kerala', // selectbox
        country: 1 // select
      }
    };
    this.addInputBindings();
    this.createForm();
  }

  addInputBindings() {
    this.stateList = ['Kerala', 'Tamilnadu'];
    this.countryList = [
      {
        id: 1,
        name: 'India'
      },{
        id: 2,
        name: 'US'
      }];
      this.formTitle = 'Registration';
      this.genderList = ['male', 'female'];
      this.interestsList = [{
        id: 1,
        name: 'Cricket'
      },{
        id: 2,
        name: 'Football'
      }, {
        id: 3,
        name: 'Chess'
      }];
  }

  createForm() {
    this.inputFormGroup = this.formBuilder.group({
      name: [this.inputData.name, Validators.required],
      emails: this.formBuilder.array(this.inputData.emails.map((email: any) => this.createEmailsFormGroup(email))),
      gender: [this.inputData.gender, Validators.required],
      interests: [this.inputData.interests, Validators.required],
      active: [this.inputData.active, Validators.required],
      address: this.formBuilder.group({
        zip: [this.inputData.address.zip, [Validators.required]],
        state: [this.inputData.address.state, [Validators.required]],
        country: [this.inputData.address.country, [Validators.required]],
      })
    });
  }

  createEmailsFormGroup(email: any) {
    return this.formBuilder.group({
      id: [email.id],
      email: [email.email, Validators.required]
    });
  }

  addEmails() {
    const data = {
      id: null,
      email: null
    };
    const emailsFormArray = this.inputFormGroup.get('emails') as FormArray;
    emailsFormArray.push(this.createEmailsFormGroup(data))
  }
}
