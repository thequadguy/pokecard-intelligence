import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { DatabaseService } from '../../src/data/database/DatabaseService';
import { PricingEngine } from '../../src/features/pricing/PricingEngine';
import { FuzzyMatcher } from '../../src/features/scanner/FuzzyMatcher';

const db = new DatabaseService();
const pricer = new PricingEngine();
const matcher = new FuzzyMatcher();

interface Stats {
  totalCards: number;
  totalValue: number;
  totalCost: number;
  topCard: any;
}

export default function PortfolioScreen() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadStats(); }, []);

  const loadStats = async () => {
    const collection = await db.getCollection();
    let totalValue = 0, totalCost = 0, topCard = null, topValue = 0;
    for (const item of collection) {
      const price = pricer.getPrice(item.cardId, item.grade);
      totalValue += price.mid;
      totalCost += item.acquiredPrice || 0;
      if (price.mid > topValue) { topValue = price.mid; topCard = { item, price, card: matcher.getCardById(item.cardId) }; }
    }
    setStats({ totalCards: collection.length, totalValue, totalCost, topCard });
    setLoading(false);
  };

  if (loading) return <View style={styles.center}><Text style={styles.text}>Loading portfolio...</Text></View>;

  const profit = (stats?.totalValue ?? 0) - (stats?.totalCost ?? 0);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heroBox}>
        <Text style={styles.heroLabel}>Total Portfolio Value</Text>
        <Text style={styles.heroValue}>${stats?.totalValue.toFixed(2)}</Text>
        <Text style={[styles.profitText, profit >= 0 ? styles.positive : styles.negative]}>
          {profit >= 0 ? '+' : ''}{profit.toFixed(2)} P&L
        </Text>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{stats?.totalCards}</Text>
          <Text style={styles.statLabel}>Cards</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>${stats?.totalCost.toFixed(2)}</Text>
          <Text style={styles.statLabel}>Invested</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>
            {stats?.totalCost ? ((profit / stats.totalCost) * 100).toFixed(1) : '0'}%
          </Text>
          <Text style={styles.statLabel}>ROI</Text>
        </View>
      </View>
      {stats?.topCard && (
        <View style={styles.topCard}>
          <Text style={styles.topCardLabel}>Top Card</Text>
          <Text style={styles.topCardName}>{stats.topCard.card?.name ?? stats.topCard.item.cardId}</Text>
          <Text style={styles.topCardValue}>${stats.topCard.price.mid.toFixed(2)}</Text>
        </View>
      )}
      {!stats?.totalCards && (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>Scan cards to build your portfolio</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1a1a2e' },
  heroBox: { alignItems: 'center', padding: 40, backgroundColor: '#16213e', margin: 16, borderRadius: 16 },
  heroLabel: { color: '#aaa', fontSize: 14 },
  heroValue: { fontSize: 48, fontWeight: 'bold', color: '#4ade80', marginTop: 8 },
  profitText: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  positive: { color: '#4ade80' },
  negative: { color: '#e63946' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', margin: 16 },
  statBox: { alignItems: 'center', backgroundColor: '#16213e', padding: 16, borderRadius: 12, flex: 1, margin: 4 },
  statValue: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  statLabel: { color: '#aaa', fontSize: 12, marginTop: 4 },
  topCard: { margin: 16, backgroundColor: '#0f3460', borderRadius: 12, padding: 20 },
  topCardLabel: { color: '#aaa', fontSize: 12, marginBottom: 8 },
  topCardName: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  topCardValue: { fontSize: 24, color: '#4ade80', fontWeight: 'bold', marginTop: 8 },
  emptyBox: { margin: 32, alignItems: 'center' },
  emptyText: { color: '#aaa', fontSize: 16, textAlign: 'center' },
  text: { color: '#fff', fontSize: 16 },
});
