import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { JourneyStage } from '../../components/JourneyStage';
import patientJourneyData from '../data/patient_journey.json';
import { PatientJourneyData } from '../types/journey';

export default function PatientJourneyScreen() {
  const data = patientJourneyData as PatientJourneyData;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Patient Journey</Text>
          <Text style={styles.headerSubtitle}>
            Navigate your healthcare experience with confidence
          </Text>
        </View>

        {data.stages
          .sort((a, b) => a.order - b.order)
          .map((stage) => (
            <JourneyStage key={stage.id} stage={stage} />
          ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Last updated: {new Date(data.metadata.lastUpdated).toLocaleDateString()}
          </Text>
          <Text style={styles.footerText}>Version {data.metadata.version}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  footer: {
    marginTop: 32,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#bdc3c7',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#95a5a6',
    marginBottom: 4,
  },
});
