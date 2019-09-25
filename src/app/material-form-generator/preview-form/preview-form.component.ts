import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-preview-form',
  templateUrl: './preview-form.component.html',
  styleUrls: ['./preview-form.component.scss']
})
export class PreviewFormComponent implements OnInit {

  @Input() selectedControls: any;
  @Input() inputFormGroup: any;
  @Input() settings: string;

  constructor() { }

  ngOnInit() {
  }

}
