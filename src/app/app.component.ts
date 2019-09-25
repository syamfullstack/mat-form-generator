import { Component, OnInit } from '@angular/core';
import { data3 } from './file-generator/data';
import { fileGenerator } from './file-generator/files.generator';
import { getHtmlContent } from './file-generator/html.generator';
// import { fileGenerator } from './material-form-generator/utilities/file-generator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular-material-forms';
  ngOnInit() {
    // fileGenerator(data3[0]);
  }
}
