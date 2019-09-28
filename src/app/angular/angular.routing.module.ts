import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
        redirectTo: 'material',
        pathMatch: 'full'
	},
	{
		path: 'material',
		loadChildren: () => import('./material/material.module').then((material) => material.MaterialFormGeneratorModule)
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class AngularRoutingModule {}
