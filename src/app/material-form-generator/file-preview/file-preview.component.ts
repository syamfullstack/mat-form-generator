import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { fileGenerator } from 'src/app/file-generator/files.generator';

@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.scss']
})
export class FilePreviewComponent implements OnInit, OnChanges {
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
