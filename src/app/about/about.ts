import { Component, DestroyRef, inject, signal } from '@angular/core';
import { PageTitle } from '../page-title/page-title';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButton } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DataService } from '../services/data';

@Component({
  selector: 'app-about',
  imports: [PageTitle, MatCardModule, MatButton, MatChipsModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  private dataService = inject(DataService);
  private destroyRef = inject(DestroyRef);
  aboutDetails = signal<any>(null);

  constructor() {
    this.dataService
      .getData('about')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.aboutDetails.set(data[0]);
      });
  }
}
