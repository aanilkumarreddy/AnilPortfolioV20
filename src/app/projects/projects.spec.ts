import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Projects } from './projects';
import { DataService } from '../services/data';
import { DestroyRef, provideZonelessChangeDetection } from '@angular/core';

const mockProjectsData = [
  { title: 'Project One', description: 'First project' },
  { title: 'Project Two', description: 'Second project' },
];

describe('Projects', () => {
  let component: Projects;
  let fixture: ComponentFixture<Projects>;
  let dataServiceMock: any;
  let destroyRefMock: any;

  beforeEach(async () => {
    dataServiceMock = {
      getData: jasmine
        .createSpy('getData')
        .and.returnValue(of(mockProjectsData)),
    };
    destroyRefMock = {};

    await TestBed.configureTestingModule({
      imports: [Projects],
      providers: [
        { provide: DataService, useValue: dataServiceMock },
        { provide: DestroyRef, useValue: destroyRefMock },
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Projects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set projectsDetails from dataService observable', () => {
    expect(component.projectsDetails()).toEqual(mockProjectsData);
  });

  it('should render all project items in the template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Project One');
    expect(compiled.textContent).toContain('Project Two');
  });
});
