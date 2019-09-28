import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatFormGeneratorDragDropComponent } from './mat-form-generator-drag-drop/mat-form-generator-drag-drop.component';


const routes: Routes = [{
    path: '',
    component: MatFormGeneratorDragDropComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialRoutingModule { }