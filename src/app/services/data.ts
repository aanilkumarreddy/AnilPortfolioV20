import { inject, Injectable, signal } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  doc,
  Firestore,
  getDoc,
  getDocs,
  updateDoc,
} from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private firestore = inject(Firestore);

  generalDataCollection = collection(
    this.firestore,
    'general'
  ) as CollectionReference<any>;

  item$ = collectionData<any>(this.generalDataCollection);

  // contacts = toSignal(
  //   collectionData(this.generalDataCollection, { idField: 'id' }),
  //   {
  //     initialValue: [],
  //   }
  // );
  // experienceData = collection(
  //   this.firestore,
  //   'experience'
  // ) as CollectionReference<any>;
  // educationData = collection(
  //   this.firestore,
  //   'education'
  // ) as CollectionReference<any>;

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
    // collectionData returns a hot observable
    return collectionData(collection(this.firestore, collectionPath), {
      idField: 'id',
    });
    // .pipe(
    //   // map((response: any) => {
    //   //   console.log('Response from collectionData:', response);
    //   //   // // map the returnd docs into your ICategory
    //   //   // // i am not including this part here
    //   //   return response.map((doc: any) => ({
    //   //     ...doc,
    //   //   }));
    //   // })
    // );
  }

  // async getExperienceData() {
  //   const snapshot = await getDocs(this.experienceData);
  //   return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  // }

  // constructor() {
  //   this.getGeneralData();
  // }

  async addDataToFireDatabase(path: string, data: any): Promise<void> {
    const dataCollection = collection(this.firestore, path);
    await addDoc(dataCollection, data);
  }

  async updateDataInFireDatabase(
    path: string,
    id: string,
    data: any
  ): Promise<void> {
    const dataCollection = collection(this.firestore, path);
    const docRef = doc(dataCollection, id);
    await updateDoc(docRef, data);
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
}

//   {
//     begin: '02-17-2018',
//     description:
//       'Co-ordinating between different departments, providing logistical support, making arrangements to go thing well.',
//     end: '16-03-2018',
//     link: 'http://www.ciencia.in',
//     subtitle: 'Hospitality Head at Ciencia 2K18',
//     thumbnail: 'ciencia.png',
//     title: 'Ciencia 2K18',
//   },
//   {
//     begin: '07-21-2018',
//     description:
//       'Took active part in planting tree hosted by Happy Happo Hub, an NGO near Nagole',
//     end: '07-22-2018',
//     link: 'https://instagram.com/happy_happo_hub',
//     subtitle: 'Planting 1000 saplings near Nagole',
//     thumbnail: 'happo.jpg',
//     title: 'Happy Happo Hub',
//   },
//   {
//     begin: '02-15-2017',
//     description:
//       'Organised the special events that were as a part of fest and visited 2 orphanages as a part of social cause',
//     end: '04-04-2017',
//     link: 'http://www.ciencia.in',
//     subtitle: 'Special Events Head',
//     thumbnail: 'ciencia.png',
//     title: 'Ciencia 2k17',
//   },
//   {
//     begin: '12-30-2016',
//     description:
//       'Co-ordinating between different departments, providing logistical support, making arrangements to go thing well as planned',
//     end: '04-13-2018',
//     link: 'http://www.facebook.com/IETEINSTITUTE',
//     subtitle: 'Marketing Head of IETESF-CVR',
//     thumbnail: 'iete.jpg',
//     title: 'IETE',
//   },
//   {
//     begin: 2015,
//     description: 'Organised several workshops, guest lectures, fests etc...',
//     end: 2018,
//     link: 'https://www.facebook.com/ECETechnolitesCVR/',
//     subtitle: 'Student member at Technolites',
//     thumbnail: 'technolites.png',
//     title: 'Technolites-CVR',
//   },
// ];

// const users = {
//   accuracy: 14.003000259399414,
//   latitude: 17.5188563,
//   longitude: 78.3863889,
// };

// const about = {
//   technologiesUsed: [
//     'Angular',
//     'Angular Material',
//     'HTML5',
//     'CSS 3',
//     'SCSS',
//     'TypeScript',
//     'JavaScript',
//   ],
//   additionalTechnologies: [
//     'Firebase',
//     'Vertex AI',
//     'Agents',
//     'Airtificial Intelligence',
//     'Roboto Font',
//   ],
//   title: 'About this page',
//   subtitle: 'AngularCV: a simple self-hosted online-CV',
//   description:
//     'This online portfolio, hosted on Firebase, showcases my web development skills with an interactive and professional design. It features an AI assistant powered by Vertex AI and Artificial Intelligence, highlighting my expertise in modern web development and AI integration. The design, enhanced by Roboto Font, ensures an engaging user experience. This portfolio stands out as a strong example of my capabilities for recruiters.',
// };
