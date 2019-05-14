import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProposallistComponent } from './proposallist/proposallist.component';
import { CollaterallistComponent } from './collaterallist/collaterallist.component';
import { NewproposalComponent } from './newproposal/newproposal.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared/services/auth.guard';
import { AuthChildGuard } from './shared/services/auth-child.guard';
import { LoginComponent } from './login/login.component';
import { RfpContainerComponent } from './rfp-container/rfp-container.component';

const routes: Routes = [
  {
    path:'', component: RfpContainerComponent,
    canActivateChild:[AuthChildGuard],
    children:[
      {path:'', component: LoginComponent},
      {path:'dashboard', component: DashboardComponent},
      {path:'proposals', component: ProposallistComponent},
      {path:'collaterals', component: CollaterallistComponent},
      {path:'newproposal', component: NewproposalComponent, outlet:'dialogs'},
    ]
  },
  {path:'login', component: LoginComponent},
  {path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
