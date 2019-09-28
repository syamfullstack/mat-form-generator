import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialContainerComponent } from './material-container/material-container.component';


const routes: Routes = [{
    path: '',
    component: MaterialContainerComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialRoutingModule { }