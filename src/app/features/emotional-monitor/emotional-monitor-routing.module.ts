import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputFormComponent } from './components/input-form/input-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChipModule } from 'primeng/chip';
const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'input', component: InputFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmotionalMonitorRoutingModule { }
