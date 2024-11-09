import { View, Text, KeyboardAvoidingView, Platform, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { styles } from '../styles/Login';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { router } from 'expo-router';
import FirebaseManager from '../services/FirebaseManager';

const Login = () => {
  const { type } = useLocalSearchParams<{ type: string }>();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) router.replace('/routes');
    } catch (error: any) {
      console.log(error);
      alert('Sign in failed: ' + error.message);
    }
    setLoading(false);
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        // Salva username e uid dell'utente nella collezione /Users
        const firebaseManager = new FirebaseManager();
        await firebaseManager.addDocument('Users', {
          uid: user.uid,
          username: username,
        });

        // Naviga alla pagina routes
        router.replace('/routes');
      }
    } catch (error: any) {
      console.log(error);
      alert('Sign up failed: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={styles.container} keyboardVerticalOffset={1}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      <Text style={styles.title}>{type === 'login' ? 'Welcome back' : 'Create your account'}</Text>

      <View style={{ marginBottom: 20 }}>
        <TextInput autoCapitalize="none" placeholder="Email" style={styles.inputField} value={email} onChangeText={setEmail} />
        <TextInput autoCapitalize="none" placeholder="Username" style={styles.inputField} value={username} onChangeText={setUsername} />
        <TextInput
          autoCapitalize="none"
          placeholder="Password"
          style={styles.inputField}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {type === 'login' ? (
        <TouchableOpacity onPress={signIn} style={[styles.btn, styles.btnPrimary]}>
          <Text style={styles.btnPrimaryText}>Login</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={signUp} style={[styles.btn, styles.btnPrimary]}>
          <Text style={styles.btnPrimaryText}>Create account</Text>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
};

export default Login;
