import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ColorPalette } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../constants/styles/LoginRegister';

const LoginRegisterButton = () => {
  const { bottom } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <Link
        href={{
          pathname: '/login',
          params: {
            type: 'login',
          },
        }}
        asChild
        style={[styles.btn, styles.btnLight]}
      >
        <Pressable>
          <Text style={styles.btnLightText}>Log in</Text>
        </Pressable>
      </Link>

      <Link
        href={{
          pathname: '/login',
          params: {
            type: 'register',
          },
        }}
        asChild
        style={[styles.btn, styles.btnDark]}
      >
        <TouchableOpacity>
          <Ionicons name="mail" size={20} style={styles.btnIcon} color={ColorPalette.light} />
          <Text style={styles.btnDarkText}>Register with Email</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default LoginRegisterButton;
