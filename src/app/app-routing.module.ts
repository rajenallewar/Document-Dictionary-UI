import { ViewFileComponent } from './view-file/view-file.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'dashboard', component: DashboardComponent},
  {path:'view/:filename', component: ViewFileComponent},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {path:'**', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
