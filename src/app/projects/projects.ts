import { Component, DestroyRef, inject, signal } from '@angular/core';
import { PageTitle } from '../page-title/page-title';
import { CvItem } from '../cv-item/cv-item';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DataService } from '../services/data';

@Component({
  selector: 'app-projects',
  imports: [PageTitle, CvItem],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  private dataService = inject(DataService);
  private destroyRef = inject(DestroyRef);
  projectsDetails = signal<any>(null);

  constructor() {
    this.dataService
      .getData('projects')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.projectsDetails.set(data);
      });
  }
}
