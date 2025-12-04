import { Component, OnInit } from '@angular/core';
import { BulletinService } from '../../../../core/services/bulletin.service';
import { Bulletin } from '../../../../core/models/bulletin.model';

@Component({
  standalone: false,
  selector: 'app-editor-view',
  templateUrl: './editor-view.component.html',
  styleUrls: ['./editor-view.component.scss']
})
export class EditorViewComponent implements OnInit {
  bulletins: Bulletin[] = [];
  selectedBulletin: Bulletin | null = null;
  displayDialog: boolean = false;
  isEditMode: boolean = false;
  displayDeleteDialog: boolean = false;
  bulletinToDelete: Bulletin | null = null;

  constructor(private bulletinService: BulletinService) {}

  ngOnInit(): void {
    this.loadMyBulletins();
  }

  loadMyBulletins(): void {
    const currentUser = this.bulletinService.getCurrentUser();
    this.bulletinService.getBulletinsByAuthor(currentUser.id).subscribe(bulletins => {
      this.bulletins = bulletins;
    });
  }

  openNew(): void {
    // Спочатку закриваємо діалог для скидання форми
    this.displayDialog = false;
    this.isEditMode = false;
    this.selectedBulletin = null;

    // Відкриваємо діалог з затримкою для повної реініціалізації
    setTimeout(() => {
      this.displayDialog = true;
    }, 0);
  }

  editBulletin(bulletin: Bulletin): void {
    // Спочатку закриваємо діалог
    this.displayDialog = false;
    this.isEditMode = true;
    this.selectedBulletin = { ...bulletin };

    // Відкриваємо діалог з затримкою для повної реініціалізації
    setTimeout(() => {
      this.displayDialog = true;
    }, 0);
  }

  onBulletinSaved(): void {
    this.displayDialog = false;
    this.selectedBulletin = null;
    this.loadMyBulletins();
  }

  onDialogHide(): void {
    this.selectedBulletin = null;
    this.isEditMode = false;
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      draft: 'Чернетка',
      published: 'Опубліковано',
      archived: 'Архів'
    };
    return labels[status] || status;
  }

  getStatusSeverity(status: string): string {
    const severities: { [key: string]: string } = {
      draft: 'warning',
      published: 'success',
      archived: 'secondary'
    };
    return severities[status] || 'info';
  }

  confirmDelete(bulletin: Bulletin): void {
    this.bulletinToDelete = bulletin;
    this.displayDeleteDialog = true;
  }

  deleteBulletin(): void {
    if (this.bulletinToDelete) {
      this.bulletinService.deleteBulletin(this.bulletinToDelete.id).subscribe(success => {
        if (success) {
          this.displayDeleteDialog = false;
          this.bulletinToDelete = null;
          this.loadMyBulletins();
        }
      });
    }
  }

  cancelDelete(): void {
    this.displayDeleteDialog = false;
    this.bulletinToDelete = null;
  }
}
