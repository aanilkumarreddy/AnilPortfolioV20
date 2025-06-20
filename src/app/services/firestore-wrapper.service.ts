import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  addDoc,
  updateDoc,
  doc,
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class FirestoreWrapperService {
  collection = collection;
  collectionData = collectionData;
  addDoc = addDoc;
  updateDoc = updateDoc;
  doc = doc;
}
