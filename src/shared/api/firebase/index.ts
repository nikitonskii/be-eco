import firestore from '@react-native-firebase/firestore';

class FirebaseService {
  private firestore: firestore.Firestore;

  constructor() {
    this.firestore = firestore();
  }

  // Create a new document in Firestore
  async createDocument(collectionName: string, data: any) {
    try {
      const docRef = await this.firestore.collection(collectionName).add(data);

      return docRef.id;
    } catch (error) {
      console.error('Error creating document:', error);
      throw error;
    }
  }

  // Get a document from Firestore by its ID
  async getDocument(collectionName: string, documentId: string) {
    try {
      const docRef = this.firestore.collection(collectionName).doc(documentId);
      const docSnapshot = await docRef.get();

      if (docSnapshot.exists) {
        return docSnapshot.data();
      } else {
        console.log('Document does not exist.');

        return null;
      }
    } catch (error) {
      console.error('Error getting document:', error);
      throw error;
    }
  }

  // Update a document in Firestore
  async updateDocument(collectionName: string, documentId: string, data: any) {
    try {
      await this.firestore.collection(collectionName).doc(documentId).update(data);
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  }

  // Delete a document from Firestore
  async deleteDocument(collectionName: string, documentId: string) {
    try {
      await this.firestore.collection(collectionName).doc(documentId).delete();
    } catch (error) {
      console.error('Error deleting document:', error);

      throw error;
    }
  }
}

export default new FirebaseService();
