import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { EmotionalState, EmotionOption, ChartData } from '../models/emotional-state.model';

@Injectable({
  providedIn: 'root'
})
export class EmotionalStateService {
  private mockStates: EmotionalState[] = [
    {
      id: '1',
      userId: 'user1',
      generalState: 7,
      emotions: ['Радість', 'Спокій'],
      associations: ['Успіх на іспиті', 'Зустріч з друзями'],
      note: 'Сьогодні був чудовий день',
      createdAt: new Date('2025-11-20')
    },
    {
      id: '2',
      userId: 'user1',
      generalState: 5,
      emotions: ['Стрес', 'Тривога'],
      associations: ['Екзамени', 'Дедлайни'],
      note: 'Багато завдань',
      createdAt: new Date('2025-11-22')
    },
    {
      id: '3',
      userId: 'user1',
      generalState: 8,
      emotions: ['Радість', 'Впевненість'],
      associations: ['Закінчення проекту', 'Відпочинок'],
      note: 'Здав всі роботи вчасно',
      createdAt: new Date('2025-11-25')
    },
    {
      id: '4',
      userId: 'user1',
      generalState: 6,
      emotions: ['Спокій', 'Зацікавленість'],
      associations: ['Нова тема', 'Цікава лекція'],
      note: 'Дізнався багато нового',
      createdAt: new Date('2025-11-27')
    },
    {
      id: '5',
      userId: 'user1',
      generalState: 9,
      emotions: ['Радість', 'Натхнення'],
      associations: ['Успішний захист', 'Похвала викладача'],
      note: 'Отримав відмінну оцінку!',
      createdAt: new Date('2025-11-29')
    }
  ];

  private emotionOptions: EmotionOption[] = [
    { label: 'Радість', value: 'Радість' },
    { label: 'Сум', value: 'Сум' },
    { label: 'Гнів', value: 'Гнів' },
    { label: 'Страх', value: 'Страх' },
    { label: 'Здивування', value: 'Здивування' },
    { label: 'Відраза', value: 'Відраза' },
    { label: 'Спокій', value: 'Спокій' },
    { label: 'Тривога', value: 'Тривога' },
    { label: 'Стрес', value: 'Стрес' },
    { label: 'Впевненість', value: 'Впевненість' },
    { label: 'Невпевненість', value: 'Невпевненість' },
    { label: 'Натхнення', value: 'Натхнення' },
    { label: 'Зацікавленість', value: 'Зацікавленість' },
    { label: 'Нудьга', value: 'Нудьга' }
  ];

  private associationSuggestions: string[] = [
    'Навчання',
    'Екзамени',
    'Дедлайни',
    'Проект',
    'Робота',
    'Сім\'я',
    'Друзі',
    'Хобі',
    'Спорт',
    'Здоров\'я',
    'Відпочинок',
    'Подорожі',
    'Музика',
    'Книги',
    'Фільми'
  ];

  getEmotionalStates(userId: string): Observable<EmotionalState[]> {
    const filtered = this.mockStates.filter(s => s.userId === userId);
    return of([...filtered]).pipe(delay(300));
  }

  createEmotionalState(state: Omit<EmotionalState, 'id' | 'createdAt'>): Observable<EmotionalState> {
    const newState: EmotionalState = {
      ...state,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    this.mockStates.push(newState);
    return of(newState).pipe(delay(300));
  }

  getEmotionOptions(): Observable<EmotionOption[]> {
    return of([...this.emotionOptions]);
  }

  getAssociationSuggestions(query: string): Observable<string[]> {
    const filtered = this.associationSuggestions.filter(s =>
      s.toLowerCase().includes(query.toLowerCase())
    );
    return of(filtered).pipe(delay(200));
  }

  getChartData(userId: string): Observable<ChartData> {
    const states = this.mockStates
      .filter(s => s.userId === userId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    const chartData: ChartData = {
      labels: states.map(s => this.formatDate(s.createdAt)),
      datasets: [
        {
          label: 'Загальний стан',
          data: states.map(s => s.generalState),
          fill: false,
          borderColor: '#42A5F5',
          backgroundColor: '#42A5F5',
          tension: 0.4
        }
      ]
    };

    return of(chartData).pipe(delay(300));
  }

  private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}.${month}`;
  }
}
