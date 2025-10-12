import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import PatientJourneyScreen from '../screens/PatientJourneyScreen';

export default function HomeScreen() {
  const [showJourney, setShowJourney] = React.useState(false);
  
  if (showJourney) {
    return <PatientJourneyScreen />;
  }
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Welcome to PatientPilot</Text>
        <Text style={styles.heroSubtitle}>
          Your guide through every step of your healthcare journey
        </Text>
      </View>

      <Pressable 
        style={styles.journeyCard} 
        onPress={() => setShowJourney(true)}
        accessibilityRole='button'
      >
        <Text style={styles.journeyIcon}>🏥</Text>
        <View style={styles.journeyTextContainer}>
          <Text style={styles.journeyTitle}>View Patient Journey</Text>
          <Text style={styles.journeySubtitle}>
            Navigate your healthcare experience with confidence
          </Text>
        </View>
        <Text style={styles.arrow}>→</Text>
      </Pressable>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>What's Inside:</Text>
        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🔍</Text>
            <Text style={styles.featureText}>Awareness - Recognizing symptoms</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🤔</Text>
            <Text style={styles.featureText}>Consideration - Choosing providers</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📅</Text>
            <Text style={styles.featureText}>Access - Scheduling appointments</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🏥</Text>
            <Text style={styles.featureText}>Care Delivery - Your appointment</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🔄</Text>
            <Text style={styles.featureText}>Ongoing Care - Follow-up & billing</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  content: {
    padding: 20,
  },
  hero: {
    marginBottom: 24,
    paddingVertical: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    lineHeight: 22,
  },
  journeyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    padding: 20,
    borderRadius: 16,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  journeyIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  journeyTextContainer: {
    flex: 1,
  },
  journeyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  journeySubtitle: {
    fontSize: 14,
    color: '#ecf0f1',
  },
  arrow: {
    fontSize: 24,
    color: '#fff',
    marginLeft: 8,
  },
  infoSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 16,
  },
  featureList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 12,
    width: 32,
  },
  featureText: {
    fontSize: 15,
    color: '#555',
    flex: 1,
  },
});
