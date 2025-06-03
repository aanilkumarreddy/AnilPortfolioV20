import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cv-item',
  imports: [
    MatCardModule,
    MatIcon,
    MatChipsModule,
    MatDividerModule,
    MatButtonModule,
  ],
  templateUrl: './cv-item.html',
  styleUrl: './cv-item.scss',
})
export class CvItem {
  cvItem = input.required<any>();

  isExpanded: boolean = false;

  toggleDetails(event: any) {
    const card = event.target.closest('mat-card');
    if (card.classList.contains('opened')) {
      card.classList.add('closed');
      card.classList.remove('opened');
      // event.target.closest('.toggle-details md-icon').innerHTML = 'expand_more'
    } else {
      card.classList.add('opened');
      card.classList.remove('closed');
      // event.target.closest('.toggle-details md-icon').innerHTML = 'expand_less'
    }
    this.isExpanded = !this.isExpanded; // Toggle the boolean state
  }
}
