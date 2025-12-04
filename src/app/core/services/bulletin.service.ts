import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Bulletin, BulletinCategory, UserRole } from '../models/bulletin.model';

@Injectable({
  providedIn: 'root'
})
export class BulletinService {
  private mockBulletins: Bulletin[] = [
    {
      id: '1',
      title: 'Початок нового семестру',
      content: '<p>Вітаємо всіх студентів з початком нового навчального семестру! Бажаємо успіхів у навчанні.</p>',
      category: 'news',
      authorId: 'editor1',
      authorName: 'Іван Петренко',
      createdAt: new Date('2025-11-15'),
      updatedAt: new Date('2025-11-15'),
      status: 'published'
    },
    {
      id: '2',
      title: 'Науковий семінар з AI',
      content: '<p>Запрошуємо всіх бажаючих на науковий семінар присвячений штучному інтелекту. Дата: 15 грудня 2025.</p>',
      category: 'events',
      authorId: 'editor1',
      authorName: 'Іван Петренко',
      createdAt: new Date('2025-11-20'),
      updatedAt: new Date('2025-11-20'),
      status: 'published'
    },
    {
      id: '3',
      title: 'Зимова сесія 2025',
      content: '<p>Інформація про розклад зимової екзаменаційної сесії буде опублікована 1 грудня.</p>',
      category: 'academic',
      authorId: 'admin1',
      authorName: 'Марія Коваленко',
      createdAt: new Date('2025-11-25'),
      updatedAt: new Date('2025-11-25'),
      status: 'published'
    },
    {
      id: '4',
      title: 'Стипендіальна програма',
      content: '<p>Відкрито прийом заявок на участь у стипендіальній програмі для найкращих студентів.</p>',
      category: 'scholarship',
      authorId: 'editor1',
      authorName: 'Іван Петренко',
      createdAt: new Date('2025-11-28'),
      updatedAt: new Date('2025-11-28'),
      status: 'published'
    },
    {
      id: '5',
      title: 'Спортивні змагання',
      content: '<p>Запрошуємо студентів взяти участь у міжфакультетських спортивних змаганнях.</p>',
      category: 'sports',
      authorId: 'editor2',
      authorName: 'Олена Сидоренко',
      createdAt: new Date('2025-11-29'),
      updatedAt: new Date('2025-11-29'),
      status: 'published'
    },
    {
      id: '6',
      title: 'Конференція молодих науковців',
      content: '<p>Запрошуємо подати тези доповідей на щорічну конференцію молодих науковців.</p>',
      category: 'events',
      authorId: 'admin1',
      authorName: 'Марія Коваленко',
      createdAt: new Date('2025-11-30'),
      updatedAt: new Date('2025-11-30'),
      status: 'published'
    },
    {
      id: '7',
      title: 'Оновлення графіку занять',
      content: '<p>У зв\'язку з ремонтними роботами змінено графік занять для груп 2-го курсу.</p>',
      category: 'academic',
      authorId: 'editor2',
      authorName: 'Олена Сидоренко',
      createdAt: new Date('2025-12-01'),
      updatedAt: new Date('2025-12-01'),
      status: 'draft'
    },
    {
      id: '8',
      title: 'Літня практика студентів',
      content: '<p>Інформація про місця проходження літньої практики для студентів 3-го курсу.</p>',
      category: 'academic',
      authorId: 'editor1',
      authorName: 'Іван Петренко',
      createdAt: new Date('2025-12-02'),
      updatedAt: new Date('2025-12-02'),
      status: 'draft'
    },
    {
      id: '9',
      title: 'Запрошення на день відкритих дверей',
      content: '<p>Запрошуємо всіх охочих відвідати день відкритих дверей університету.</p>',
      category: 'events',
      authorId: 'admin1',
      authorName: 'Марія Коваленко',
      createdAt: new Date('2025-12-03'),
      updatedAt: new Date('2025-12-03'),
      status: 'published'
    },
    {
      id: '10',
      title: 'Міжнародний обмін студентами',
      content: '<p>Відкрито реєстрацію на програму міжнародного обміну на 2026 рік.</p>',
      category: 'scholarship',
      authorId: 'editor2',
      authorName: 'Олена Сидоренко',
      createdAt: new Date('2025-12-04'),
      updatedAt: new Date('2025-12-04'),
      status: 'published'
    },
    {
      id: '11',
      title: 'Волонтерська програма',
      content: '<p>Запрошуємо студентів долучитися до волонтерських проектів університету.</p>',
      category: 'news',
      authorId: 'editor1',
      authorName: 'Іван Петренко',
      createdAt: new Date('2025-12-05'),
      updatedAt: new Date('2025-12-05'),
      status: 'published'
    },
    {
      id: '12',
      title: 'Турнір з кібер-спорту',
      content: '<p>Проведення турніру з кібер-спорту серед студентів університету.</p>',
      category: 'sports',
      authorId: 'editor2',
      authorName: 'Олена Сидоренко',
      createdAt: new Date('2025-12-06'),
      updatedAt: new Date('2025-12-06'),
      status: 'published'
    },
    {
      id: '13',
      title: 'Оновлення бібліотечного фонду',
      content: '<p>Бібліотека поповнилася новими навчальними матеріалами та літературою.</p>',
      category: 'news',
      authorId: 'admin1',
      authorName: 'Марія Коваленко',
      createdAt: new Date('2025-12-07'),
      updatedAt: new Date('2025-12-07'),
      status: 'archived'
    },
    {
      id: '14',
      title: 'Конкурс наукових робіт',
      content: '<p>Оголошено конкурс наукових робіт студентів з призовим фондом.</p>',
      category: 'scholarship',
      authorId: 'editor1',
      authorName: 'Іван Петренко',
      createdAt: new Date('2025-12-08'),
      updatedAt: new Date('2025-12-08'),
      status: 'published'
    },
    {
      id: '15',
      title: 'Майстер-клас від випускників',
      content: '<p>Запрошуємо на майстер-клас від успішних випускників університету.</p>',
      category: 'events',
      authorId: 'editor2',
      authorName: 'Олена Сидоренко',
      createdAt: new Date('2025-12-09'),
      updatedAt: new Date('2025-12-09'),
      status: 'published'
    }
  ];

  private categories: BulletinCategory[] = [
    { label: 'Всі категорії', value: '' },
    { label: 'Новини', value: 'news' },
    { label: 'Події', value: 'events' },
    { label: 'Академічне', value: 'academic' },
    { label: 'Стипендії', value: 'scholarship' },
    { label: 'Спорт', value: 'sports' }
  ];

  // Симуляція поточного користувача
  private currentUser = {
    id: 'editor1',
    name: 'Іван Петренко',
    role: UserRole.EDITOR
  };

  getBulletins(): Observable<Bulletin[]> {
    return of([...this.mockBulletins]).pipe(delay(300));
  }

  getBulletinsByAuthor(authorId: string): Observable<Bulletin[]> {
    const filtered = this.mockBulletins.filter(b => b.authorId === authorId);
    return of([...filtered]).pipe(delay(300));
  }

  getBulletinById(id: string): Observable<Bulletin | undefined> {
    const bulletin = this.mockBulletins.find(b => b.id === id);
    return of(bulletin).pipe(delay(200));
  }

  createBulletin(bulletin: Partial<Bulletin>): Observable<Bulletin> {
    // Якщо authorId передано (адмін обрав автора), використовуємо його
    const authorId = bulletin.authorId || this.currentUser.id;
    const author = this.getAuthorById(authorId);

    const newBulletin: Bulletin = {
      id: Date.now().toString(),
      title: bulletin.title || '',
      content: bulletin.content || '',
      category: bulletin.category || '',
      authorId: authorId,
      authorName: author.name,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: bulletin.status || 'draft'
    };
    this.mockBulletins.push(newBulletin);
    return of(newBulletin).pipe(delay(300));
  }

  updateBulletin(id: string, bulletin: Partial<Bulletin>): Observable<Bulletin> {
    const index = this.mockBulletins.findIndex(b => b.id === id);
    if (index !== -1) {
      // Якщо authorId змінено, оновлюємо і authorName
      if (bulletin.authorId && bulletin.authorId !== this.mockBulletins[index].authorId) {
        const author = this.getAuthorById(bulletin.authorId);
        bulletin.authorName = author.name;
      }

      this.mockBulletins[index] = {
        ...this.mockBulletins[index],
        ...bulletin,
        updatedAt: new Date()
      };
      return of(this.mockBulletins[index]).pipe(delay(300));
    }
    throw new Error('Bulletin not found');
  }

  deleteBulletin(id: string): Observable<boolean> {
    const index = this.mockBulletins.findIndex(b => b.id === id);
    if (index !== -1) {
      this.mockBulletins.splice(index, 1);
      return of(true).pipe(delay(300));
    }
    return of(false).pipe(delay(300));
  }

  getCategories(): Observable<BulletinCategory[]> {
    return of([...this.categories]);
  }

  getCurrentUser() {
    return this.currentUser;
  }

  setUserRole(role: UserRole) {
    this.currentUser.role = role;
  }

  private getAuthorById(authorId: string): { id: string; name: string } {
    const authors: { [key: string]: { id: string; name: string } } = {
      'editor1': { id: 'editor1', name: 'Іван Петренко' },
      'editor2': { id: 'editor2', name: 'Олена Сидоренко' },
      'admin1': { id: 'admin1', name: 'Марія Коваленко' }
    };
    return authors[authorId] || authors['editor1'];
  }
}
