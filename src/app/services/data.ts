import { inject, Injectable, signal } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, Observable } from 'rxjs';
import { FirestoreWrapperService } from './firestore-wrapper.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private firestore = inject(Firestore);
  private firestoreWrapper = inject(FirestoreWrapperService);

  generalDataCollection = this.firestoreWrapper.collection(
    this.firestore,
    'general'
  ) as any;

  item$ = this.firestoreWrapper.collectionData<any>(this.generalDataCollection);

  generalData = signal<any>(null);

  // async getGeneralData() {
  //   try {
  //     console.log('Fetching general data...', this.generalDataCollection);
  //     const snapshot = await getDocs(this.generalDataCollection);
  //     console.log('General Data:', snapshot);
  //     this.generalData.set(
  //       snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  //     );
  //   } catch (error) {
  //     console.error('Error fetching general data:', error);
  //     throw error; // Re-throw if you want calling code to handle it
  //   }
  // }

  getData(collectionPath: string): Observable<any> {
    return this.firestoreWrapper.collectionData(
      this.firestoreWrapper.collection(this.firestore, collectionPath),
      {
        idField: 'id',
      }
    );
  }

  // async getExperienceData() {
  //   const snapshot = await getDocs(this.experienceData);
  //   return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  // }

  async addDataToFireDatabase(path: string, data: any): Promise<void> {
    const dataCollection = this.firestoreWrapper.collection(
      this.firestore,
      path
    );
    await this.firestoreWrapper.addDoc(dataCollection, data);
  }

  async updateDataInFireDatabase(
    path: string,
    id: string,
    data: any
  ): Promise<void> {
    const dataCollection = this.firestoreWrapper.collection(
      this.firestore,
      path
    );
    const docRef = this.firestoreWrapper.doc(dataCollection, id);
    await this.firestoreWrapper.updateDoc(docRef, data);
  }
}

// async addObjectsToCollection(): Promise<void> {
//   console.log(`Adding ${projects.length} projects to Firestore.`);
//   console.log('Projects array:', projects);
//   const collectionRef = collection(this.firestore, 'volunteering');
//   for (const obj of projects) {
//     try {
//       await addDoc(collectionRef, obj);
//       console.log(`Successfully added document: ${JSON.stringify(obj)}`);
//     } catch (error) {
//       console.error(`Error adding document: ${JSON.stringify(obj)}`, error);
//     }
//   }
// }
