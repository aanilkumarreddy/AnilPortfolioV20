import { ComponentFixture, TestBed } from '@angular/core/testing';
import { About } from './about';
import { DataService } from '../services/data';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';

describe('About', () => {
  let component: About;
  let fixture: ComponentFixture<About>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  const mockAboutData = {
    title: 'Test Title',
    subtitle: 'Test Subtitle',
    description: 'Test Description',
    technologiesUsed: ['Angular', 'Firebase'],
    additionalTechnologies: ['Jasmine', 'Karma'],
  };

  beforeEach(async () => {
    dataServiceSpy = jasmine.createSpyObj('DataService', ['getData']);
    dataServiceSpy.getData.and.returnValue(of([mockAboutData]));
    await TestBed.configureTestingModule({
      imports: [About],
      providers: [
        { provide: DataService, useValue: dataServiceSpy },
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(About);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch about details and update signal', () => {
    expect(component.aboutDetails()).toEqual(mockAboutData);
  });

  it('should render about details in template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    console.log('errex', compiled.querySelector('mat-card-title')?.textContent);
    expect(compiled.querySelector('mat-card-title')?.textContent).toContain(
      'ABOUT info'
    );
    expect(compiled.querySelector('mat-card-subtitle')?.textContent).toContain(
      'Test Subtitle'
    );
    expect(compiled.querySelector('mat-card-content')?.textContent).toContain(
      'Test Description'
    );
    // Check technologies chips
    expect(compiled.querySelectorAll('mat-chip').length).toBeGreaterThan(0);
  });

  it('should display all technologies used', () => {
    fixture.detectChanges();
    const chips = fixture.debugElement.queryAll(By.css('mat-chip'));
    const chipTexts = chips.map((chip) =>
      chip.nativeElement.textContent.trim()
    );
    expect(chipTexts).toContain('Angular');
    expect(chipTexts).toContain('Firebase');
    expect(chipTexts).toContain('Jasmine');
    expect(chipTexts).toContain('Karma');
  });
});
