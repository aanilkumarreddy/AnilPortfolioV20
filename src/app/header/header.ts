import { Component, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { UpperCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
@Component({
  selector: 'app-header',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    UpperCasePipe,
    RouterModule,
    MatMenuModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  navLinks = [
    { location: '/overview', label: 'Overview', icon: 'account_circle' },
    { location: '/experience', label: 'Experience', icon: 'work' },
    { location: '/education', label: 'Education', icon: 'school' },
    { location: '/projects', label: 'Projects', icon: 'assignment' },
    { location: '/volunteering', label: 'Volunteering', icon: 'favorite' },
    { location: '/contact', label: 'Contact', icon: 'email' },
    { location: '/about', label: 'About', icon: 'info' },
  ];

  windowWidth = window.innerWidth;

  ngAfterViewInit() {
    this.windowWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.windowWidth = (event.target as Window).innerWidth;
  }
}
