import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>Pokecard Intelligence</Text>
        <Text style={styles.subtitle}>Scan. Grade. Track. Profit.</Text>
      </View>
      <View style={styles.grid}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Scanner')}>
          <Text style={styles.cardIcon}>S</Text>
          <Text style={styles.cardTitle}>Scan Card</Text>
          <Text style={styles.cardDesc}>Identify any Pokemon card instantly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Collection')}>
          <Text style={styles.cardIcon}>C</Text>
          <Text style={styles.cardTitle}>Collection</Text>
          <Text style={styles.cardDesc}>Browse your card collection</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Portfolio')}>
          <Text style={styles.cardIcon}>$</Text>
          <Text style={styles.cardTitle}>Portfolio</Text>
          <Text style={styles.cardDesc}>Track your collection value</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  hero: { alignItems: 'center', padding: 40, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#e63946', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#aaa' },
  grid: { padding: 20, gap: 16 },
  card: { backgroundColor: '#16213e', borderRadius: 12, padding: 24, marginBottom: 16,
    borderWidth: 1, borderColor: '#0f3460' },
  cardIcon: { fontSize: 36, marginBottom: 8 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  cardDesc: { fontSize: 14, color: '#aaa' },
});
