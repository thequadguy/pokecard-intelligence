import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { DatabaseService } from '../../src/data/database/DatabaseService';
import { PricingEngine } from '../../src/features/pricing/PricingEngine';
import { FuzzyMatcher } from '../../src/features/scanner/FuzzyMatcher';

const db = new DatabaseService();
const pricer = new PricingEngine();
const matcher = new FuzzyMatcher();

export default function CollectionScreen() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadCollection(); }, []);

  const loadCollection = async () => {
    setLoading(true);
    const collection = await db.getCollection();
    const enriched = collection.map((item: any) => {
      const card = matcher.getCardById(item.cardId);
      const price = pricer.getPrice(item.cardId, item.grade);
      return { ...item, card, price };
    });
    setItems(enriched);
    setLoading(false);
  };

  const removeItem = async (id: number) => {
    await db.removeFromCollection(id);
    loadCollection();
  };

  if (loading) return <View style={styles.center}><Text style={styles.text}>Loading collection...</Text></View>;
  if (items.length === 0) return (
    <View style={styles.center}>
      <Text style={styles.text}>No cards yet</Text>
      <Text style={styles.sub}>Scan cards to add them here</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{items.length} Cards in Collection</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardInfo}>
              <Text style={styles.cardName}>{item.card?.name ?? item.cardId}</Text>
              <Text style={styles.cardMeta}>Grade: {item.grade} | Set: {item.card?.set ?? 'Unknown'}</Text>
              <Text style={styles.cardPrice}>Est. ${item.price?.mid?.toFixed(2) ?? 'N/A'}</Text>
            </View>
            <TouchableOpacity style={styles.removeBtn} onPress={() => removeItem(item.id)}>
              <Text style={styles.removeBtnText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1a1a2e' },
  header: { color: '#aaa', fontSize: 14, padding: 16 },
  text: { color: '#fff', fontSize: 18 },
  sub: { color: '#aaa', fontSize: 14, marginTop: 8 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#16213e',
    margin: 8, borderRadius: 8, padding: 16, borderWidth: 1, borderColor: '#0f3460' },
  cardInfo: { flex: 1 },
  cardName: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  cardMeta: { color: '#aaa', fontSize: 12, marginTop: 4 },
  cardPrice: { color: '#4ade80', fontSize: 14, marginTop: 4 },
  removeBtn: { backgroundColor: '#e63946', borderRadius: 6, padding: 8 },
  removeBtnText: { color: '#fff', fontSize: 12 },
});
