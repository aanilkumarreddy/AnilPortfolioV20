import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Footer } from './footer';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    (component as any).count = () => 42; // Set input before detectChanges
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the count input in the template', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain("USER'S COUNT: 42");
  });
});
