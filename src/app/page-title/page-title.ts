import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-page-title',
  imports: [MatCardModule, MatIcon],
  templateUrl: './page-title.html',
  styleUrl: './page-title.scss',
})
export class PageTitle {
  title = input.required<string>();
  icon = input.required<string>();
}
