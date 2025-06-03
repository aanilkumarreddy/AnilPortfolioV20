import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Agent } from './agent/agent';
import { DataService } from './services/data';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Agent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'AnilPortfolio';
  private dataService = inject(DataService);

  count = signal<number>(0);

  constructor() {
    this.dataService
      .getData('userCount')
      .pipe(take(1))
      .subscribe((data) => {
        this.count.set(data?.[0]?.count + 1 || 0);
        this.updateCount(data?.[0]?.id || '');
      });
  }

  updateCount(id: string) {
    this.dataService
      .updateDataInFireDatabase('userCount', id, {
        count: this.count(),
      })
      .then(() => {
        console.log('User count updated successfully');
      })
      .catch((error) => {
        console.error('Error updating user count:', error);
      });
  }
}
