
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor() {
    const storedUser = localStorage.getItem('limpioya_user');
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string):boolean {
    if (email === 'cliente@limpioya.com' && password === '123456') {
      const user: User = { id: 'C001', name: 'Juan Pérez', email, role: 'CLIENT', phone: '3001234567' };
      localStorage.setItem('limpioya_user', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return true;
    } else if (email === 'admin@limpioya.com' && password === '123456') {
      const user: User = { id: 'A001', name: 'Admin Principal', email, role: 'ADMIN' };
      localStorage.setItem('limpioya_user', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return true;
    }
    
    // Check local storage for registered users
    const users = JSON.parse(localStorage.getItem('limpioya_users') || '[]');
    const found = users.find((u: any) => u.email === email && u.password === password);
    if(found) {
        const user: User = { id: found.id, name: found.name, email, role: 'CLIENT', phone: found.phone };
        localStorage.setItem('limpioya_user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return true;
    }
    return false;
  }
  
  register(data: any) {
    const users = JSON.parse(localStorage.getItem('limpioya_users') || '[]');
    const newUser = {
        id: 'C00' + (users.length + 2),
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password
    };
    users.push(newUser);
    localStorage.setItem('limpioya_users', JSON.stringify(users));
  }

  logout() {
    localStorage.removeItem('limpioya_user');
    this.currentUserSubject.next(null);
  }
  
  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }
}
