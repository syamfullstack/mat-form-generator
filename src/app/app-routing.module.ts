import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
		path: '',
    redirectTo: 'angular',
    pathMatch: 'full'
	},
	{
		path: 'angular',
    loadChildren: () => import('./angular/angular.module').then((data) => data.AngularrModule),
    
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
