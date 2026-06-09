import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { FuzzyMatcher } from '../../src/features/scanner/FuzzyMatcher';
import { GradingEngine } from '../../src/features/grading/GradingEngine';
import { PricingEngine } from '../../src/features/pricing/PricingEngine';
import { DatabaseService } from '../../src/data/database/DatabaseService';

const matcher = new FuzzyMatcher();
const grader = new GradingEngine();
const pricer = new PricingEngine();
const db = new DatabaseService();

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleScan = async () => {
    setScanning(true);
    try {
      const card = matcher.findBestMatch('pikachu base set');
      if (card) {
        const grade = grader.gradeCard({ surface: 8, corners: 7, edges: 9, centering: 8 });
        const price = pricer.getPrice(card.id, grade.numericGrade);
        setResult({ card, grade, price });
        await db.addToCollection({ cardId: card.id, grade: grade.numericGrade, acquiredPrice: price.low, notes: '' });
      }
    } catch (e) {
      Alert.alert('Error', String(e));
    } finally {
      setScanning(false);
    }
  };

  if (!permission) return <View style={styles.container}><Text style={styles.text}>Loading camera...</Text></View>;
  if (!permission.granted) return (
    <View style={styles.container}>
      <Text style={styles.text}>Camera permission needed</Text>
      <TouchableOpacity style={styles.btn} onPress={requestPermission}>
        <Text style={styles.btnText}>Grant Permission</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back">
        <View style={styles.overlay}>
          <View style={styles.scanBox} />
          <Text style={styles.hint}>Point at a Pokemon card</Text>
        </View>
      </CameraView>
      <View style={styles.controls}>
        {result && (
          <View style={styles.resultBox}>
            <Text style={styles.resultTitle}>{result.card.name}</Text>
            <Text style={styles.resultSub}>Set: {result.card.set} | Grade: {result.grade.label}</Text>
            <Text style={styles.resultPrice}>Est. Value: ${result.price.mid.toFixed(2)}</Text>
          </View>
        )}
        <TouchableOpacity style={[styles.btn, scanning && styles.btnDisabled]} onPress={handleScan} disabled={scanning}>
          <Text style={styles.btnText}>{scanning ? 'Scanning...' : 'Scan Card'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  camera: { flex: 1 },
  overlay: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scanBox: { width: 260, height: 180, borderWidth: 2, borderColor: '#e63946', borderRadius: 8 },
  hint: { color: '#fff', marginTop: 16, fontSize: 14 },
  controls: { padding: 20, backgroundColor: '#16213e' },
  resultBox: { backgroundColor: '#0f3460', borderRadius: 8, padding: 16, marginBottom: 16 },
  resultTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  resultSub: { color: '#aaa', marginTop: 4 },
  resultPrice: { color: '#4ade80', fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  btn: { backgroundColor: '#e63946', borderRadius: 8, padding: 16, alignItems: 'center' },
  btnDisabled: { opacity: 0.5 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  text: { color: '#fff', fontSize: 16, textAlign: 'center', margin: 20 },
});
