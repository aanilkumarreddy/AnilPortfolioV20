import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DataService } from '../services/data';
import { PageTitle } from '../page-title/page-title';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-contact',
  imports: [MatCardModule, MatIcon, MatListModule, PageTitle, MatButtonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private dataService = inject(DataService);
  private destroyRef = inject(DestroyRef);
  contactDetails = signal<any>(null);

  constructor() {
    this.dataService
      .getData('contact')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.contactDetails.set(data[0]);
      });
  }
}
