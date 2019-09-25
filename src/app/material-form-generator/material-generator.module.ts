import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatListModule
    
} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';


import { CommonModule } from '@angular/common';
import { MatFormGeneratorDragDropComponent } from './mat-form-generator-drag-drop/mat-form-generator-drag-drop.component';
import { MatFormAdvancedSettingsComponent } from './mat-form-advanced-settings/mat-form-advanced-settings.component';
import { GlobalFormSettingsComponent } from './global-form-settings/global-form-settings.component';
import { MatFormGeneratorComponent } from '../mat-form-generator/mat-form-generator.component';
import { FilePreviewComponent } from './file-preview/file-preview.component';

@NgModule({
  declarations: [
    MatFormGeneratorDragDropComponent,
    MatFormAdvancedSettingsComponent,
    GlobalFormSettingsComponent,
    MatFormGeneratorComponent,
    FilePreviewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    // Material components
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    // MatMomentDateModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatTableModule,
    DragDropModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatListModule
  ],
  exports: [MatFormGeneratorDragDropComponent, MatFormGeneratorComponent],

  entryComponents: [MatFormAdvancedSettingsComponent, GlobalFormSettingsComponent],
  providers: [],
  
})
export class MaterialFormGeneratorModule { }
