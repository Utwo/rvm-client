import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationsComponent } from './organizations/organizations.component';
import { NgodashboardComponent } from './organizations/components/ngodashboard/ngodashboard.component';
import { NgoaddComponent } from './organizations/components/ngoadd/ngoadd.component';
import { NgodetailsComponent } from './organizations/components/ngodetails/ngodetails.component';
const routes: Routes = [
	{
		path: '',
		component: OrganizationsComponent,
		children: [
			{
				path: '',
				component: NgodashboardComponent,
			},
			{
				path: 'add',
				component: NgoaddComponent,
			},
			{
				path: 'id/:id',
				component: NgodetailsComponent,
			},
		]
	}
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(routes)]
})
export class OrganizationsRoutingModule {

}
