import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Volunteering } from './volunteering';
import { DataService } from '../services/data';
import { DestroyRef } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';

const mockVolunteeringData = [
  { title: 'Charity Event', description: 'Helped organize a charity event.' },
  { title: 'Tree Plantation', description: 'Planted trees in the community.' },
];

describe('Volunteering', () => {
  let component: Volunteering;
  let fixture: ComponentFixture<Volunteering>;
  let dataServiceMock: any;
  let destroyRefMock: any;

  beforeEach(async () => {
    dataServiceMock = {
      getData: jasmine
        .createSpy('getData')
        .and.returnValue(of(mockVolunteeringData)),
    };
    destroyRefMock = {};

    await TestBed.configureTestingModule({
      imports: [Volunteering],
      providers: [
        provideZonelessChangeDetection(),
        { provide: DataService, useValue: dataServiceMock },
        { provide: DestroyRef, useValue: destroyRefMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Volunteering);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set volunteeringDetails from dataService observable', () => {
    expect(component.volunteeringDetails()).toEqual(mockVolunteeringData);
  });

  it('should render all volunteering items in the template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Charity Event');
    expect(compiled.textContent).toContain('Tree Plantation');
  });
});
