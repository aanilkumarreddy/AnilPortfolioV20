import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { DataService } from './services/data';
import { of } from 'rxjs';
import { FirebaseApp } from '@angular/fire/app';
import { Firestore } from '@angular/fire/firestore';
import { AgentService } from './services/agentic-service';
import { provideRouter } from '@angular/router';

const firestoreMock = {};

const firebaseAppMock = {
  getProvider: (name: string) => {
    console.log(`Requested provider: ${name}`); // Debug which services are requested
    if (name === 'firestore') {
      return {
        getImmediate: () => firestoreMock,
      };
    } else if (name === 'ai') {
      return {
        getImmediate: () => ({}), // Mock AI service as an empty object
      };
    }
    // Fallback for unknown services
    return {
      getImmediate: () => ({}),
    };
  },
};

describe('App', () => {
  let dataServiceMock: any;
  let agentServiceMock: any;

  beforeEach(async () => {
    dataServiceMock = {
      getData: jasmine
        .createSpy('getData')
        .and.returnValue(of([{ count: 5, id: 'abc' }])),
      updateDataInFireDatabase: jasmine
        .createSpy('updateDataInFireDatabase')
        .and.returnValue(Promise.resolve()),
    };

    agentServiceMock = {
      processMessage: jasmine
        .createSpy('processMessage')
        .and.returnValue(Promise.resolve('Mocked response')),
    };

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: DataService, useValue: dataServiceMock },
        { provide: FirebaseApp, useValue: firebaseAppMock },
        { provide: Firestore, useValue: firestoreMock },
        { provide: AgentService, useValue: agentServiceMock },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set count from dataService observable', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.count()).toBe(6); // 5 + 1 from constructor logic
  });

  it('should call updateCount and handle success', async () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    spyOn(console, 'log');
    await app.updateCount('abc');
    expect(dataServiceMock.updateDataInFireDatabase).toHaveBeenCalledWith(
      'userCount',
      'abc',
      { count: app.count() }
    );
    expect(console.log).toHaveBeenCalledWith('User count updated successfully');
  });

  it('should call updateCount and handle error', async () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    const error = new Error('fail');
    spyOn(console, 'error');
    dataServiceMock.updateDataInFireDatabase.and.returnValue(
      Promise.reject(error)
    );
    await app.updateCount('abc');
    await Promise.resolve(); // <-- Add this line
    expect(console.error).toHaveBeenCalledWith(
      'Error updating user count:',
      error
    );
  });
});
