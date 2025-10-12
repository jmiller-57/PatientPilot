import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { Tip } from "../app/types/journey";

interface Props {
  tip: Tip;
  expanded?: boolean;
}

const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
  switch (priority) {
    case 'high':
      return '#ff6b6b';
    case 'medium':
      return '#ffa500';
    case 'low':
      return '#4ecdc4';
    default:
      return '#95a5a6';
  }
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
    borderLeftWidth: 4,
  },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  body: { fontSize: 14, lineHeight: 20, color: '#333' },
  priorityBadge: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 6,
  }
});

export function TipCard({ tip, expanded = true }: Props) {
  const borderColor = getPriorityColor(tip.priority);
  
  return (
    <View style={[styles.card, { borderLeftColor: borderColor }]}>
      <Text style={[styles.priorityBadge, { color: borderColor }]}>
        {tip.priority} priority
      </Text>
      <Text style={styles.title}>{tip.title}</Text>
      {expanded && <Text style={styles.body}>{tip.body}</Text>}
    </View>
  );
}