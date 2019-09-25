import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { fileGenerator } from './node_modules/src/app/file-generator/files.generator';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, OnChanges {
  @Input() pages: any;
  file: any = {};

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.generateFile();
  }

  generateFile() {
    if (this.pages[0].formData.controls) {
      this.file = fileGenerator(this.pages[0]);
    }
  }

}
