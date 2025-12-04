import { Component, OnInit } from '@angular/core';
import { BulletinService } from '../../../../core/services/bulletin.service';
import { Bulletin } from '../../../../core/models/bulletin.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  standalone: false,
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class AdminViewComponent implements OnInit {
  bulletins: Bulletin[] = [];
  selectedBulletin: Bulletin | null = null;
  displayDialog: boolean = false;
  isEditMode: boolean = false;

  constructor(
    private bulletinService: BulletinService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadAllBulletins();
  }

  loadAllBulletins(): void {
    this.bulletinService.getBulletins().subscribe(bulletins => {
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

  deleteBulletin(bulletin: Bulletin): void {
    this.confirmationService.confirm({
      message: `Ви дійсно хочете видалити оголошення "${bulletin.title}"?`,
      header: 'Підтвердження видалення',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.bulletinService.deleteBulletin(bulletin.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Успіх',
              detail: 'Оголошення успішно видалено'
            });
            this.loadAllBulletins();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Помилка',
              detail: 'Не вдалося видалити оголошення'
            });
          }
        });
      }
    });
  }

  onBulletinSaved(): void {
    this.displayDialog = false;
    this.selectedBulletin = null;
    this.loadAllBulletins();
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
}
