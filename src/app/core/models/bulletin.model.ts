export interface Bulletin {
  id: string;
  title: string;
  content: string;
  category: string;
  authorId: string;
  authorName: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published' | 'archived';
}

export interface BulletinCategory {
  label: string;
  value: string;
}

export enum UserRole {
  USER = 'user',
  EDITOR = 'editor',
  ADMIN = 'admin'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
}
