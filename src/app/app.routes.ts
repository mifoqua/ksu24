import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/bulletin-board', pathMatch: 'full' },
  {
    path: 'bulletin-board',
    loadChildren: () =>
      import('./features/bulletin-board/bulletin-board.module').then(m => m.BulletinBoardModule)
  },
  {
    path: 'emotional-monitor',
    loadChildren: () =>
      import('./features/emotional-monitor/emotional-monitor.module').then(m => m.EmotionalMonitorModule)
  },
  { path: '**', redirectTo: '/bulletin-board' }
];
