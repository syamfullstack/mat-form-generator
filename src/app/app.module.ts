import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialFormComponent } from './material-form/material-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


import { MatFormGeneratorComponent } from './mat-form-generator/mat-form-generator.component';
import { CommonModule } from '@angular/common';
import { MatFormGeneratorDragDropComponent } from './mat-form-generator-drag-drop/mat-form-generator-drag-drop.component';

@NgModule({
  declarations: [
    AppComponent,
    MaterialFormComponent,
    MatFormGeneratorComponent,
    MatFormGeneratorDragDropComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
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
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
