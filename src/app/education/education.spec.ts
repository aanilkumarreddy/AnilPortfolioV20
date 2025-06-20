import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';

import { Education } from './education';
import { DataService } from '../services/data';

const mockEducationData = [
  {
    LanguageItems: [
      { title: 'English', level: 90 },
      { title: 'Hindi', level: 80 },
    ],
    CertificationItems: [
      { title: 'AWS Certified', year: 2022 },
      { title: 'Azure Fundamentals', year: 2021 },
    ],
    EducationItems: [
      { title: 'B.Tech', subtitle: 'CVR College', year: 2020 },
      { title: 'Intermediate', subtitle: 'Narayana', year: 2016 },
    ],
  },
];

describe('Education', () => {
  let component: Education;
  let fixture: ComponentFixture<Education>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    dataServiceSpy = jasmine.createSpyObj('DataService', ['getData']);
    dataServiceSpy.getData.and.returnValue(of(mockEducationData));
    await TestBed.configureTestingModule({
      imports: [Education],
      providers: [
        { provide: DataService, useValue: dataServiceSpy },
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(Education);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and set education details', () => {
    expect(component.educationDetails()).toEqual(mockEducationData[0]);
  });

  it('should render all language items', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('English');
    expect(compiled.textContent).toContain('Hindi');
  });

  it('should render all certificate items', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('AWS Certified');
    expect(compiled.textContent).toContain('Azure Fundamentals');
  });

  it('should render all education items', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('B.Tech');
    expect(compiled.textContent).toContain('CVR College');
    expect(compiled.textContent).toContain('Intermediate');
    expect(compiled.textContent).toContain('Narayana');
  });
});
