import { FIREBASE_AUTH } from '../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import FirebaseManager from '../services/FirebaseManager';

class LoginModel {
  private auth = FIREBASE_AUTH;
  private firebaseManager = new FirebaseManager();

  async signIn(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async signUp(email: string, password: string, username: string): Promise<UserCredential> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;

    if (user) {
      await this.firebaseManager.addDocument('Users', {
        uid: user.uid,
        username: username,
      });
    }

    return userCredential;
  }
}

export default LoginModel;
