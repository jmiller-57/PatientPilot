import React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { Tip } from "../app/types/tips";

interface Props {
  tip: Tip;
  expanded?: boolean;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    elevation: 2
  },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  body: { fontSize: 14, lineHeight: 20, color: '#333' }
});

export function TipCard({ tip, expanded = true }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{tip.title}</Text>
      {expanded && <Text style={styles.body}>{tip.body}</Text>}
    </View>
  );
}