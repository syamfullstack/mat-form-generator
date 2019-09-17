import { Component, OnInit } from '@angular/core';
import { data } from './file-generator/data';
import { formGroupGenerator } from './file-generator/formGroupGenerator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular-material-forms';
  ngOnInit() {
    formGroupGenerator(data);
  }
}
