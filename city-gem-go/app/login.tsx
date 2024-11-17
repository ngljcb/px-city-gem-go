import { View, Text, KeyboardAvoidingView, Platform, ActivityIndicator, TextInput, TouchableOpacity, Switch } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { styles } from '../styles/Login';
import useLoginViewModel from '../viewmodels/LoginViewModel';

const Login = () => {
  const { type } = useLocalSearchParams<{ type: string }>();
  const {
    loading,
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    saveCredentials,
    handleSaveCredentialsToggle,
    signIn,
    signUp,
    isLogin,
  } = useLoginViewModel(type);

  return (
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={styles.container} keyboardVerticalOffset={1}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      <Text style={styles.title}>{isLogin ? 'Welcome back' : 'Create your account'}</Text>

      <View style={{ marginBottom: 20 }}>
        <TextInput autoCapitalize="none" placeholder="Email" style={styles.inputField} value={email} onChangeText={setEmail} />
        {!isLogin && <TextInput autoCapitalize="none" placeholder="Username" style={styles.inputField} value={username} onChangeText={setUsername} />}
        <TextInput
          autoCapitalize="none"
          placeholder="Password"
          style={styles.inputField}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {isLogin && (
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleText}>Remember Me</Text>
          <Switch value={saveCredentials} onValueChange={handleSaveCredentialsToggle} />
        </View>
      )}

      <TouchableOpacity onPress={isLogin ? signIn : signUp} style={[styles.btn, styles.btnPrimary]}>
        <Text style={styles.btnPrimaryText}>{isLogin ? 'Login' : 'Create account'}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Login;
