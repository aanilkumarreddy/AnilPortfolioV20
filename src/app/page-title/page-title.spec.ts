import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageTitle } from './page-title';
import { provideZonelessChangeDetection } from '@angular/core';

describe('PageTitle', () => {
  let component: PageTitle;
  let fixture: ComponentFixture<PageTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTitle],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(PageTitle);
    component = fixture.componentInstance;
    (component as any).title = () => 'Test Title';
    (component as any).icon = () => 'work';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and icon in the template', () => {
    (component as any).title = () => 'Test Title';
    (component as any).icon = () => 'work';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Title');
    expect(compiled.textContent).toContain('work');
  });
});
