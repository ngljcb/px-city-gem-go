import React from 'react';
import { Text, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '../constants/styles/Help';

export default function Help() {
  const router = useRouter();

  const goToHome = () => {
    router.replace('/routes');
  };

  return (
    <ImageBackground source={require('@/assets/images/riddles-backdrop.png')} style={styles.container} resizeMode="cover">
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Guida al gioco</Text>
        <Text style={styles.text}>Completa tutti gli indovinelli nel minor tempo possibile e scopri angoli nascosti della città!</Text>

        <Text style={styles.sectionTitle}>1. Inizia la tua avventura</Text>
        <Text style={styles.text}>Scegli un percorso tra quelli disponibili e preparati a esplorare!</Text>

        <Text style={styles.sectionTitle}>2. Indovina e rispondi</Text>
        <Text style={styles.text}>
          Leggi attentamente l’indovinello per capire la tua prossima destinazione. Inserisci la tua risposta nel campo dedicato e premi "Invia" per
          verificare.
        </Text>

        <Text style={styles.sectionTitle}>3. Raggiungi il luogo e scatta un selfie</Text>
        <Text style={styles.text}>
          Se la risposta è corretta, il gioco ti guiderà al luogo esatto. Scatta un selfie con il posto sullo sfondo per dimostrare la tua presenza.
        </Text>

        <Text style={styles.sectionTitle}>4. Avanza nel percorso</Text>
        <Text style={styles.text}>
          Dopo che la tua foto sarà verificata, proseguirai con il prossimo indovinello. Continua a rispondere e spostarti da una tappa all’altra fino
          al completamento del percorso!
        </Text>

        <Text style={styles.sectionTitle}>5. Concludi l’avventura</Text>
        <Text style={styles.text}>Al termine del percorso, visualizzerai il tempo totale impiegato per completare la tua missione.</Text>

        <Text style={styles.footer}>Buona caccia al tesoro e divertiti a esplorare! 🕵️‍♀️📸</Text>

        <TouchableOpacity style={styles.button} onPress={goToHome}>
          <Text style={styles.buttonText}>Torna alla Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}
