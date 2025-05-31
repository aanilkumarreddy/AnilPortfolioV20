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
  // cvItem = {
  //   begin: '07-01-2020',
  //   end: '07-31-2021',
  //   link: 'https://www.mindtree.com',
  //   subtitle: 'Senior Software Engineer',
  //   description:
  //     'Worked as a Senior Software Engineer in the Digital Transformation team at Mindtree. Developed and maintained web applications using Angular, React, and Material-UI. Worked on Electron.JS applications for desktop environments. Collaborated with cross-functional teams to deliver high-quality software solutions.',
  //   company: 'Mindtree',
  //   companyLink: 'https://www.mindtree.com',
  //   tags: [
  //     'Angular',
  //     'React',
  //     'Material-UI',
  //     'Electron.JS',
  //     'Java',
  //     'Spring Boot',
  //     'HTML5',
  //     'CSS 3',
  //     'SCSS',
  //     'Firebase',
  //   ],
  //   thumbnail: 'mindtree.jpg',
  //   title: 'Mindtree',
  //   attachment: '',
  // };
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
