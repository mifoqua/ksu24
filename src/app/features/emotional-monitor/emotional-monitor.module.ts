import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { EmotionalMonitorRoutingModule } from './emotional-monitor-routing.module';
import { InputFormComponent } from './components/input-form/input-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChipModule } from 'primeng/chip';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    InputFormComponent,
    DashboardComponent
  ],
  imports: [
    SharedModule,
    EmotionalMonitorRoutingModule,
    ChipModule,
    FormsModule
  ]
})
export class EmotionalMonitorModule { }
