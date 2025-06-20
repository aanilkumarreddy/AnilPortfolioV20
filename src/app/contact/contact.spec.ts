import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Contact } from './contact';
import { DataService } from '../services/data';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Contact', () => {
  let component: Contact;
  let fixture: ComponentFixture<Contact>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  const mockContactData = [
    {
      city: 'Hyderabad',
      mail: 'anil@example.com',
      phone: '1234567890',
      bookACall: 'https://calendly.com/anil',
      linkedin: 'https://linkedin.com/in/anil',
      github: 'https://github.com/anil',
      stackoverflow: 'https://stackoverflow.com/users/anil',
      facebook: 'https://facebook.com/anil',
      twitter: 'https://twitter.com/anil',
    },
  ];

  beforeEach(async () => {
    dataServiceSpy = jasmine.createSpyObj('DataService', ['getData']);
    dataServiceSpy.getData.and.returnValue(of(mockContactData));
    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [
        { provide: DataService, useValue: dataServiceSpy },
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch contact details and update signal', () => {
    expect(component.contactDetails()).toEqual(mockContactData[0]);
  });

  it('should render contact details in template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Hyderabad');
    expect(compiled.textContent).toContain('anil@example.com');
    expect(compiled.textContent).toContain('1234567890');
    expect(compiled.textContent).toContain('BOOK CALL');
    expect(compiled.textContent).toContain('LinkedIn');
    expect(compiled.textContent).toContain('GitHub');
    expect(compiled.textContent).toContain('Stack Overflow');
    expect(compiled.textContent).toContain('Facebook');
    expect(compiled.textContent).toContain('X(Twitter)');
  });
});
