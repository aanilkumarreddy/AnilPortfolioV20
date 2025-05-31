import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DataService } from '../services/data';
import { CvItem } from '../cv-item/cv-item';
import { PageTitle } from '../page-title/page-title';

@Component({
  selector: 'app-volunteering',
  imports: [CvItem, PageTitle],
  templateUrl: './volunteering.html',
  styleUrl: './volunteering.scss',
})
export class Volunteering {
  private dataService = inject(DataService);
  private destroyRef = inject(DestroyRef);
  volunteeringDetails = signal<any>(null);

  constructor() {
    this.dataService
      .getData('volunteering')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        console.log('Volunteering Data:', data);
        this.volunteeringDetails.set(data);
      });
  }
}
