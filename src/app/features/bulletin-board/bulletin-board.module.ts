import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BulletinBoardRoutingModule } from './bulletin-board-routing.module';

import { UserViewComponent } from './components/user-view/user-view.component';
import { EditorViewComponent } from './components/editor-view/editor-view.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { BulletinFormComponent } from './components/bulletin-form/bulletin-form.component';

@NgModule({
  declarations: [
    UserViewComponent,
    EditorViewComponent,
    AdminViewComponent,
    BulletinFormComponent
  ],
  imports: [
    SharedModule,
    BulletinBoardRoutingModule
  ]
})
export class BulletinBoardModule { }
