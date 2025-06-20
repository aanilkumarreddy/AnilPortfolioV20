import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Overview } from './overview';
import { DataService } from '../services/data';
import { DestroyRef, provideZonelessChangeDetection } from '@angular/core';

const mockOverviewData = [
  {
    position: 'Software Engineer',
    description: 'A passionate developer.',
    intrests: [
      { icon: 'code', title: 'Coding', subtitle: 'Loves to code' },
      { icon: 'music_note', title: 'Music', subtitle: 'Enjoys music' },
    ],
  },
];

describe('Overview', () => {
  let component: Overview;
  let fixture: ComponentFixture<Overview>;
  let dataServiceMock: any;
  let destroyRefMock: any;

  beforeEach(async () => {
    dataServiceMock = {
      getData: jasmine
        .createSpy('getData')
        .and.returnValue(of(mockOverviewData)),
    };
    destroyRefMock = {};

    await TestBed.configureTestingModule({
      imports: [Overview],
      providers: [
        { provide: DataService, useValue: dataServiceMock },
        { provide: DestroyRef, useValue: destroyRefMock },
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Overview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set overviewData from dataService observable', () => {
    expect(component.overviewData()).toEqual(mockOverviewData[0]);
  });

  it('should render position, description, and interests in the template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Software Engineer');
    expect(compiled.textContent).toContain('A passionate developer.');
    expect(compiled.textContent).toContain('Coding');
    expect(compiled.textContent).toContain('Music');
  });
});
