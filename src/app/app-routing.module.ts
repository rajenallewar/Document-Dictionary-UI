import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewProposalComponent } from './proposals/new-proposal/new-proposal.component';
import { ViewProposalComponent } from './proposals/view-proposal/view-proposal.component';
import { NewCollateralComponent } from './collaterals/new-collateral/new-collateral.component';
import { ViewCollateralComponent } from './collaterals/view-collateral/view-collateral.component';
import { AnnotationComponent } from './annotation/annotation/annotation.component';
import { AskmeComponent } from './askme/askme.component';
import { SmelistComponent } from './smelist/smelist.component';

const routes: Routes = [
  {path:'dashboard', component: DashboardComponent},
  {path:'newproposal', component:NewProposalComponent},
  {path:'viewproposal', component: ViewProposalComponent},
  {path:'newcollateral', component: NewCollateralComponent},
  {path:'viewcollateral', component: ViewCollateralComponent},
  {path:'askme', component: AskmeComponent},
  {path:'smelist', component: SmelistComponent},
  {path:'viewannotation/:collateralId', component: AnnotationComponent},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {path:'**', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
