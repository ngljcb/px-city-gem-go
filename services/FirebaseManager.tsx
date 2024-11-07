import { FIREBASE_DB } from '../FirebaseConfig';
import { collection, doc, getDoc, setDoc, updateDoc, deleteDoc, getDocs, query, orderBy } from 'firebase/firestore';

class FirebaseManager {
  // Metodo per ottenere un singolo documento da una collezione
  async getDocument(collectionName: string, docId: string): Promise<any> {
    try {
      const docRef = doc(FIREBASE_DB, collectionName, docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        console.log('No such document!');
        return null;
      }
    } catch (error) {
      console.error('Errore nel recupero del documento:', error);
      throw error;
    }
  }

  // Metodo per ottenere tutti i documenti di una collezione
  async getAllDocuments(collectionName: string): Promise<any[]> {
    try {
      const collRef = collection(FIREBASE_DB, collectionName);
      const querySnapshot = await getDocs(collRef);
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Errore nel recupero dei documenti:', error);
      throw error;
    }
  }

  // Nuovo metodo per ottenere documenti ordinati da una sotto-collezione
  async getOrderedDocuments(subCollectionPath: string, orderByField: string): Promise<any[]> {
    try {
      const subCollRef = collection(FIREBASE_DB, subCollectionPath);
      const orderedQuery = query(subCollRef, orderBy(orderByField, 'asc'));
      const querySnapshot = await getDocs(orderedQuery);
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error(`Errore nel recupero dei documenti da ${subCollectionPath} ordinati per ${orderByField}:`, error);
      throw error;
    }
  }

  // Metodo per aggiungere un documento a una collezione
  async addDocument(collectionName: string, data: any): Promise<void> {
    try {
      const collRef = collection(FIREBASE_DB, collectionName);
      await setDoc(doc(collRef), data);
      console.log('Documento aggiunto con successo!');
    } catch (error) {
      console.error("Errore nell'aggiunta del documento:", error);
      throw error;
    }
  }

  // Metodo per aggiornare un documento in una collezione
  async updateDocument(collectionName: string, docId: string, data: any): Promise<void> {
    try {
      const docRef = doc(FIREBASE_DB, collectionName, docId);
      await updateDoc(docRef, data);
      console.log('Documento aggiornato con successo!');
    } catch (error) {
      console.error("Errore nell'aggiornamento del documento:", error);
      throw error;
    }
  }

  // Metodo per eliminare un documento da una collezione
  async deleteDocument(collectionName: string, docId: string): Promise<void> {
    try {
      const docRef = doc(FIREBASE_DB, collectionName, docId);
      await deleteDoc(docRef);
      console.log('Documento eliminato con successo!');
    } catch (error) {
      console.error("Errore nell'eliminazione del documento:", error);
      throw error;
    }
  }
}

export default FirebaseManager;
