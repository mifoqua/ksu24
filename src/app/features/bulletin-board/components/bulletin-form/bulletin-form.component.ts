import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BulletinService } from '../../../../core/services/bulletin.service';
import { Bulletin, BulletinCategory, UserRole } from '../../../../core/models/bulletin.model';
import { MessageService } from 'primeng/api';

@Component({
  standalone: false,
  selector: 'app-bulletin-form',
  templateUrl: './bulletin-form.component.html',
  styleUrls: ['./bulletin-form.component.scss'],
  providers: [MessageService]
})
export class BulletinFormComponent implements OnInit, OnChanges {
  @Input() bulletin: Bulletin | null = null;
  @Input() isEditMode: boolean = false;
  @Input() isAdminMode: boolean = false;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  bulletinForm!: FormGroup;
  categories: BulletinCategory[] = [];
  loading: boolean = false;
  currentUserRole: UserRole = UserRole.EDITOR;

  statusOptions = [
    { label: 'Чернетка', value: 'draft' },
    { label: 'Опубліковано', value: 'published' },
    { label: 'Архів', value: 'archived' }
  ];

  authorOptions = [
    { label: 'Іван Петренко', value: 'editor1' },
    { label: 'Олена Сидоренко', value: 'editor2' },
    { label: 'Марія Коваленко', value: 'admin1' }
  ];

  constructor(
    private fb: FormBuilder,
    private bulletinService: BulletinService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Якщо bulletin змінився, оновлюємо або скидаємо форму
    if (changes['bulletin'] && !changes['bulletin'].firstChange && this.bulletinForm) {
      if (this.bulletin) {
        this.updateFormValues();
      } else {
        this.resetForm();
      }
    }
  }

  initForm(): void {
    const formConfig: any = {
      title: [this.bulletin?.title || '', [Validators.required, Validators.minLength(5)]],
      category: [this.bulletin?.category || '', Validators.required],
      content: [this.bulletin?.content || '', [Validators.required, Validators.minLength(10)]],
      status: [this.bulletin?.status || 'draft', Validators.required]
    };

    // Додаємо поле автора тільки для адміністратора
    if (this.isAdminMode) {
      formConfig.authorId = [this.bulletin?.authorId || '', Validators.required];
    }

    this.bulletinForm = this.fb.group(formConfig);
  }

  updateFormValues(): void {
    // Оновлюємо значення форми з новими даними bulletin
    this.bulletinForm.patchValue({
      title: this.bulletin?.title || '',
      category: this.bulletin?.category || '',
      content: this.bulletin?.content || '',
      status: this.bulletin?.status || 'draft'
    });

    // Якщо в режимі адміна, оновлюємо authorId
    if (this.isAdminMode && this.authorId) {
      this.authorId.patchValue(this.bulletin?.authorId || '');
    }

    // Скидаємо стан валідації
    this.bulletinForm.markAsUntouched();
    this.bulletinForm.markAsPristine();
  }

  resetForm(): void {
    // Скидаємо форму до початкових значень
    this.bulletinForm.reset({
      title: '',
      category: '',
      content: '',
      status: 'draft',
      authorId: this.isAdminMode ? '' : undefined
    });

    // Скидаємо стан валідації
    this.bulletinForm.markAsUntouched();
    this.bulletinForm.markAsPristine();
  }

  loadCategories(): void {
    this.bulletinService.getCategories().subscribe(categories => {
      // Filter out "All categories" option
      this.categories = categories.filter(c => c.value !== '');
    });
  }

  onSubmit(): void {
    if (this.bulletinForm.invalid) {
      this.bulletinForm.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Помилка',
        detail: 'Будь ласка, заповніть всі обов\'язкові поля'
      });
      return;
    }

    this.loading = true;
    const formValue = this.bulletinForm.value;

    if (this.isEditMode && this.bulletin) {
      this.bulletinService.updateBulletin(this.bulletin.id, formValue).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Успіх',
            detail: 'Оголошення успішно оновлено'
          });
          this.loading = false;
          this.saved.emit();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Помилка',
            detail: 'Не вдалося оновити оголошення'
          });
          this.loading = false;
        }
      });
    } else {
      this.bulletinService.createBulletin(formValue).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Успіх',
            detail: 'Оголошення успішно створено'
          });
          this.loading = false;
          this.saved.emit();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Помилка',
            detail: 'Не вдалося створити оголошення'
          });
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  get title() {
    return this.bulletinForm.get('title');
  }

  get category() {
    return this.bulletinForm.get('category');
  }

  get content() {
    return this.bulletinForm.get('content');
  }

  get status() {
    return this.bulletinForm.get('status');
  }

  get authorId() {
    return this.bulletinForm.get('authorId');
  }
}
