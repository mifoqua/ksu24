import { Component, OnInit } from '@angular/core';
import { BulletinService } from '../../../../core/services/bulletin.service';
import { Bulletin, BulletinCategory } from '../../../../core/models/bulletin.model';

@Component({
  standalone: false,
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
  bulletins: Bulletin[] = [];
  filteredBulletins: Bulletin[] = [];
  categories: BulletinCategory[] = [];

  selectedCategory: string = '';
  selectedDate: Date | null = null;
  searchText: string = '';

  // Pagination
  first: number = 0;
  rows: number = 6;
  totalRecords: number = 0;

  constructor(private bulletinService: BulletinService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadBulletins();
  }

  loadCategories(): void {
    this.bulletinService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadBulletins(): void {
    this.bulletinService.getBulletins().subscribe(bulletins => {
      this.bulletins = bulletins.filter(b => b.status === 'published');
      this.applyFilters();
    });
  }

  applyFilters(): void {
    let filtered = [...this.bulletins];

    // Filter by category
    if (this.selectedCategory) {
      filtered = filtered.filter(b => b.category === this.selectedCategory);
    }

    // Filter by date
    if (this.selectedDate) {
      filtered = filtered.filter(b => {
        const bulletinDate = new Date(b.createdAt);
        return bulletinDate.toDateString() === this.selectedDate!.toDateString();
      });
    }

    // Filter by search text
    if (this.searchText) {
      const searchLower = this.searchText.toLowerCase();
      filtered = filtered.filter(b =>
        b.title.toLowerCase().includes(searchLower) ||
        b.content.toLowerCase().includes(searchLower)
      );
    }

    this.filteredBulletins = filtered;
    this.totalRecords = filtered.length;
    this.first = 0; // Reset to first page
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
  }

  getPaginatedBulletins(): Bulletin[] {
    return this.filteredBulletins.slice(this.first, this.first + this.rows);
  }

  stripHtml(html: string): string {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  getExcerpt(content: string, maxLength: number = 150): string {
    const text = this.stripHtml(content);
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }

  getCategoryLabel(categoryValue: string): string {
    const category = this.categories.find(c => c.value === categoryValue);
    return category ? category.label : categoryValue;
  }
}
