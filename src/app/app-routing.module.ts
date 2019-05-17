import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProposallistComponent } from './proposallist/proposallist.component';
import { CollaterallistComponent } from './collaterallist/collaterallist.component';
import { NewproposalComponent } from './newproposal/newproposal.component';
import { AuthGuard } from './shared/services/auth.guard';
import { LoginComponent } from './login/login.component';
import { RfpContainerComponent } from './rfp-container/rfp-container.component';

const routes: Routes = [
  {
    path: 'dms',
    component: RfpContainerComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'proposals', component: ProposallistComponent },
      { path: 'collaterals', component: CollaterallistComponent },
      { path: 'newproposal', component: NewproposalComponent, outlet: 'dialogs' }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
