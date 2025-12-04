import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { EmotionalMonitorRoutingModule } from './emotional-monitor-routing.module';
import { InputFormComponent } from './components/input-form/input-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    InputFormComponent,
    DashboardComponent
  ],
  imports: [
    SharedModule,
    EmotionalMonitorRoutingModule
  ]
})
export class EmotionalMonitorModule { }
