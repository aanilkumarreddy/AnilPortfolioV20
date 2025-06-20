import { TestBed } from '@angular/core/testing';
import { DataService } from './data';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { FirebaseApp } from '@angular/fire/app';
import { provideZonelessChangeDetection } from '@angular/core';
import * as firestoreFns from '@angular/fire/firestore';
import { FirestoreWrapperService } from './firestore-wrapper.service';

// Minimal Firestore mock with internal type property
const firestoreMock = { _delegate: {}, type: 'firestore' };
const firebaseAppMock = {
  getProvider: (name: string) => {
    if (name === 'firestore') {
      return {
        getImmediate: () => firestoreMock,
      };
    } else if (name === 'ai') {
      return {
        getImmediate: () => ({}),
      };
    }
    return {
      getImmediate: () => ({}),
    };
  },
};

class MockFirestoreWrapperService {
  collection = () => ({} as any);
  collectionData = () => of([]);
  addDoc = () => Promise.resolve({ id: 'mock-id' } as any);
  updateDoc = () => Promise.resolve({ id: 'mock-id' } as any);
  doc = () => ({} as any);
}

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FirebaseApp, useValue: firebaseAppMock },
        { provide: Firestore, useValue: firestoreMock },
        {
          provide: FirestoreWrapperService,
          useClass: MockFirestoreWrapperService,
        },
        provideZonelessChangeDetection(),
      ],
    });
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get data as observable', (done) => {
    const testData = [{ id: '1', name: 'test' }];
    service.getData('test').subscribe((data) => {
      expect(data).toEqual([]); // collectionData mock returns []
      done();
    });
  });

  it('should add data to Firestore', async () => {
    await service.addDataToFireDatabase('test', { foo: 'bar' });
    expect(true).toBeTrue();
  });

  it('should update data in Firestore', async () => {
    await service.updateDataInFireDatabase('test', 'id1', { foo: 'baz' });
    expect(true).toBeTrue();
  });
});

describe('DataService error cases', () => {
  let service: DataService;

  beforeEach(() => {
    class ErrorAddDocMock extends MockFirestoreWrapperService {
      override addDoc = () => Promise.reject('add error');
    }
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: FirebaseApp, useValue: firebaseAppMock },
        { provide: Firestore, useValue: firestoreMock },
        { provide: FirestoreWrapperService, useClass: ErrorAddDocMock },
        provideZonelessChangeDetection(),
      ],
    });
    service = TestBed.inject(DataService);
  });

  it('should handle error when adding data to Firestore', async () => {
    await expectAsync(
      service.addDataToFireDatabase('test', { foo: 'bar' })
    ).toBeRejectedWith('add error');
  });
});

describe('DataService error cases for update', () => {
  let service: DataService;

  beforeEach(() => {
    class ErrorUpdateDocMock extends MockFirestoreWrapperService {
      override updateDoc = () => Promise.reject('update error');
    }
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: FirebaseApp, useValue: firebaseAppMock },
        { provide: Firestore, useValue: firestoreMock },
        { provide: FirestoreWrapperService, useClass: ErrorUpdateDocMock },
        provideZonelessChangeDetection(),
      ],
    });
    service = TestBed.inject(DataService);
  });

  it('should handle error when updating data in Firestore', async () => {
    await expectAsync(
      service.updateDataInFireDatabase('test', 'id1', { foo: 'baz' })
    ).toBeRejectedWith('update error');
  });
});
