import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { Experience } from './experience';
import { DataService } from '../services/data';
import { DestroyRef, provideZonelessChangeDetection } from '@angular/core';

const mockExperienceData = [
  { title: 'Test Job', company: 'Test Company' },
  { title: 'Another Job', company: 'Another Company' },
];

describe('Experience', () => {
  let component: Experience;
  let fixture: ComponentFixture<Experience>;
  let dataServiceMock: any;
  let destroyRefMock: any;

  beforeEach(async () => {
    dataServiceMock = {
      getData: jasmine
        .createSpy('getData')
        .and.returnValue(of(mockExperienceData)),
    };
    destroyRefMock = {};

    await TestBed.configureTestingModule({
      imports: [Experience],
      providers: [
        { provide: DataService, useValue: dataServiceMock },
        { provide: DestroyRef, useValue: destroyRefMock },
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Experience);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set experienceItems from dataService observable', () => {
    expect(component.experienceItems()).toEqual(mockExperienceData);
  });

  it('should render all experience items in the template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Job');
    expect(compiled.textContent).toContain('Another Job');
  });
});
