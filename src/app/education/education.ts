import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DataService } from '../services/data';
import { PageTitle } from '../page-title/page-title';
import { CvItem } from '../cv-item/cv-item';
@Component({
  selector: 'app-education',
  imports: [
    MatCardModule,
    MatIcon,
    MatListModule,
    MatProgressBarModule,
    PageTitle,
    CvItem,
  ],
  templateUrl: './education.html',
  styleUrl: './education.scss',
})
export class Education {
  private dataService = inject(DataService);
  private destroyRef = inject(DestroyRef);
  educationDetails = signal<any>(null);
  title = 'Education Details';

  constructor() {
    this.dataService
      .getData('education')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        console.log('Education Data:', data);
        this.educationDetails.set(data[0]);
      });
  }
}
