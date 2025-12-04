import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { EmotionalStateService } from '../../../../core/services/emotional-state.service';
import { EmotionOption } from '../../../../core/models/emotional-state.model';

@Component({
  standalone: false,
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
  providers: [MessageService]
})
export class InputFormComponent implements OnInit {
  steps: MenuItem[] = [];
  activeIndex: number = 0;

  // Step 1
  generalState: number = 5;

  // Step 2
  emotionOptions: EmotionOption[] = [];
  selectedEmotions: string[] = [];

  // Step 3
  associations: string[] = [];
  
  inputText: string = '';

  // Step 4
  note: string = '';
  loading: boolean = false;

  constructor(
    private emotionalStateService: EmotionalStateService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.steps = [
      { label: 'Загальний стан' },
      { label: 'Емоції' },
      { label: 'Асоціації' },
      { label: 'Нотатка' }
    ];
    this.loadEmotionOptions();
  }

  loadEmotionOptions(): void {
    this.emotionalStateService.getEmotionOptions().subscribe(options => {
      this.emotionOptions = options;
    });
  }

  onInput(event: any): void {
    this.inputText = event.target.value;
  }

  addCurrentAssociation(): void {
    const value = this.inputText.trim();
    if (value && !this.associations.includes(value)) {
      this.associations.push(value);
      this.inputText = ''; 
    }
  }

  removeAssociation(index: number): void {
    this.associations.splice(index, 1);
  }

  nextStep(): void {
    if (this.activeIndex < this.steps.length - 1) {
      this.activeIndex++;
    }
  }

  prevStep(): void {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  onSubmit(): void {
    this.loading = true;
    const emotionalState = {
      userId: 'user1',
      generalState: this.generalState,
      emotions: this.selectedEmotions,
      associations: this.associations,
      note: this.note
    };

    this.emotionalStateService.createEmotionalState(emotionalState).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Успіх', detail: 'Дані успішно збережено' });
        this.loading = false;
        setTimeout(() => this.router.navigate(['/emotional-monitor/dashboard']), 1500);
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Помилка', detail: 'Не вдалося зберегти дані' });
        this.loading = false;
      }
    });
  }

  canProceed(): boolean {
    switch (this.activeIndex) {
      case 0: return this.generalState > 0;
      case 1: return this.selectedEmotions.length > 0;
      case 2: return this.associations.length > 0;
      default: return true;
    }
  }

  getEmoji(value: number): string {
    const map: any = { 1: '😭', 2: '😢', 3: '😟', 4: '🙁', 5: '😐', 6: '🙂', 7: '😊', 8: '😄', 9: '😁', 10: '🤩' };
    return map[value] || '😐';
  }
}