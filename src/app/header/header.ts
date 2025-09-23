import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { UpperCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { fromEvent, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
export class Header implements OnInit {
  private destroyRef = inject(DestroyRef);

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

  ngOnInit() {
    this.windowWidth = window.innerWidth;

    fromEvent(window, 'resize')
      .pipe(startWith(null), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.windowWidth = window.innerWidth;
      });
  }
}
