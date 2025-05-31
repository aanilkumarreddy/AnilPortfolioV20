import { Component, DestroyRef, inject, signal } from '@angular/core';
import { PageTitle } from '../page-title/page-title';
import { CvItem } from '../cv-item/cv-item';
import { DataService } from '../services/data';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-experience',
  imports: [PageTitle, CvItem],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {
  private dataService = inject(DataService);
  private destroyRef = inject(DestroyRef);
  experienceItems = signal<any[]>([]);
  title = 'Professional Experience';

  constructor() {
    this.dataService
      .getData('experience')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        console.log('Experience Data:', data);
        this.experienceItems.set(data);
      });
  }
}
