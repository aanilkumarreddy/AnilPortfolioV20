import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

class TestHeader extends Header {
  constructor() {
    super();
    this.windowWidth = 1000; // Set before first change detection
  }
}

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHeader],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set windowWidth in ngAfterViewInit', () => {
    component.windowWidth = 0;
    component.ngAfterViewInit();
    expect(component.windowWidth).toBe(window.innerWidth);
  });

  it('should update windowWidth on resize', () => {
    const fakeEvent = { target: { innerWidth: 1234 } } as any;
    component.onResize(fakeEvent);
    expect(component.windowWidth).toBe(1234);
  });

  // it('should render nav links in the template', () => {
  //   component.windowWidth = 1000; // Set a fixed width for testing
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.textContent).toContain('ANIL ALLIKEPALLI');
  //   component.navLinks.forEach((link) => {
  //     expect(compiled.textContent).toContain(link.label.toUpperCase());
  //   });
  // });
});
