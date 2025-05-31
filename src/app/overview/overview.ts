import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PageTitle } from '../page-title/page-title';
import { DataService } from '../services/data';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-overview',
  imports: [MatCardModule, MatIcon, MatListModule, PageTitle],
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
})
export class Overview {
  private dataService = inject(DataService);
  private destroyRef = inject(DestroyRef);
  title = 'OVERVIEW';
  overviewData = signal<any>(null);

  constructor() {
    // console.log(this.dataService.contacts());
    // this.dataService.item$.subscribe((data) => {
    //   console.log('Item Data:', data);
    // });
    this.dataService
      .getData('overrview')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.overviewData.set(data[0]);
        console.log('Categories Data:', data[0]);
      });

    // this.dataService.addEducationData().then(() => {
    //   console.log('Education data added successfully');
    // });

    // this.dataService
    //   .addObjectsToCollection()
    //   .then(() => {
    //     console.log('Objects added to collection successfully');
    //   })
    //   .catch((error) => {
    //     console.error('Error adding objects to collection:', error);
    //   });
  }
  // generalData: any = {
  //   position: 'Software Engineer',
  //   description:
  //     'This website shall give you an impression of me and encourage your interest in hiring me. Please navigate through the site in order to find out more.',
  // };
}
