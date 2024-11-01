import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { defaultStyles } from '@/constants/Styles';
import { ColorPalette } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

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
        style={[defaultStyles.btn, styles.btnLight]}
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
        style={[defaultStyles.btn, styles.btnDark]}
      >
        <TouchableOpacity>
          <Ionicons
            name="mail"
            size={20}
            style={styles.btnIcon}
            color={ColorPalette.light}
          />
          <Text style={styles.btnDarkText}>Register with Email</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#000',
    padding: 26,
    gap: 14,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  btnLight: {
    backgroundColor: '#fff',
  },
  btnIcon: {
    paddingRight: 7,
  },
  btnLightText: {
    fontSize: 20,
  },
  btnDark: {
    backgroundColor: ColorPalette.grey,
  },
  btnDarkText: {
    color: '#fff',
    fontSize: 20,
  },
  btnOutline: {
    borderWidth: 3,
    borderColor: ColorPalette.grey,
  },
});

export default LoginRegisterButton;
