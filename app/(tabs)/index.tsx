import React from 'react';
import { FlatList, Pressable, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useTips } from '../hooks/useTips';

export default function HomeScreen() {
  const { stages, byStage } = useTips();
  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={stages}
      keyExtractor={s => s}
      renderItem={({ item: stage }) => {
        const count = byStage[stage].length
        return (
          <Link href={{ pathname: '/stages/[stage]', params: { stage } }} asChild>
            <Pressable style={styles.card} accessibilityRole='button'>
              <Text style={styles.title}>{stage.toUpperCase()}</Text>
              <Text style={styles.count}>{count} tips</Text>
            </Pressable>
          </Link>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  card: { padding: 20, backgroundColor: '#fff', borderRadius: 12, marginBottom: 14, elevation: 2 },
  title: { fontSize: 18, fontWeight: '600' },
  count: { marginTop: 6, color: '#555' }
});
