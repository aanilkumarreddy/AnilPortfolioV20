import { Component } from '@angular/core';
import { PageTitle } from '../page-title/page-title';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-about',
  imports: [PageTitle, MatCardModule, MatButton, MatChipsModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {}
