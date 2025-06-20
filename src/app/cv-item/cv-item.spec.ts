import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvItem } from './cv-item';
import { provideZonelessChangeDetection } from '@angular/core';

describe('CvItem', () => {
  let component: CvItem;
  let fixture: ComponentFixture<CvItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvItem],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(CvItem);
    component = fixture.componentInstance;
    (component as any).cvItem = () => {
      return { id: 1, title: 'Test CV Item' };
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have isExpanded default to false', () => {
    expect(component.isExpanded).toBeFalse();
  });

  it('should toggle isExpanded and update card classes (expand)', () => {
    const card = document.createElement('div');
    card.classList.add('closed');
    const event = { target: { closest: () => card } };
    component.isExpanded = false;
    component.toggleDetails(event);
    expect(card.classList.contains('opened')).toBeTrue();
    expect(card.classList.contains('closed')).toBeFalse();
    expect(component.isExpanded).toBeTrue();
  });

  it('should toggle isExpanded and update card classes (collapse)', () => {
    const card = document.createElement('div');
    card.classList.add('opened');
    const event = { target: { closest: () => card } };
    component.isExpanded = true;
    component.toggleDetails(event);
    expect(card.classList.contains('closed')).toBeTrue();
    expect(card.classList.contains('opened')).toBeFalse();
    expect(component.isExpanded).toBeFalse();
  });

  it('should require cvItem input', () => {
    expect(component.cvItem).toBeDefined();
  });
});
