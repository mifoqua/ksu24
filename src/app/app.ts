import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

interface NavItem {
  label: string;
  icon: string;
  expanded?: boolean;
  items?: NavSubItem[];
  routerLink?: string;
}

interface NavSubItem {
  label: string;
  icon: string;
  routerLink: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  sidebarCollapsed = false;
  isMobile = false;

  navItems: NavItem[] = [
    {
      label: 'Дошка оголошень',
      icon: 'pi pi-megaphone',
      expanded: false,
      items: [
        { label: 'Користувач', icon: 'pi pi-user', routerLink: '/bulletin-board/user' },
        { label: 'Редактор', icon: 'pi pi-pencil', routerLink: '/bulletin-board/editor' },
        { label: 'Адміністратор', icon: 'pi pi-shield', routerLink: '/bulletin-board/admin' }
      ]
    },
    {
      label: 'Моніторинг емоційного стану',
      icon: 'pi pi-heart',
      expanded: false,
      items: [
        { label: 'Дашборд', icon: 'pi pi-chart-line', routerLink: '/emotional-monitor/dashboard' },
        { label: 'Додати запис', icon: 'pi pi-plus', routerLink: '/emotional-monitor/input' }
      ]
    }
  ];

  constructor(private router: Router) {
    // Перевіряємо чи це мобільний пристрій
    this.checkMobile();
    window.addEventListener('resize', () => this.checkMobile());

    // Закриваємо sidebar при навігації на мобільних пристроях
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.isMobile && !this.sidebarCollapsed) {
          this.sidebarCollapsed = true;
        }
      });
  }

  checkMobile() {
    this.isMobile = window.innerWidth <= 768;
    // На мобільних за замовчуванням закритий
    if (this.isMobile && !this.sidebarCollapsed) {
      this.sidebarCollapsed = true;
    }
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  toggleNavItem(item: NavItem, event?: Event) {
    // Якщо sidebar згорнутий, спочатку його розгортаємо
    if (this.sidebarCollapsed) {
      this.sidebarCollapsed = false;
      // Затримка для плавної анімації
      setTimeout(() => {
        item.expanded = !item.expanded;
      }, 100);
    } else {
      item.expanded = !item.expanded;
    }
  }
}
