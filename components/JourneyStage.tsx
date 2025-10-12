import React, { useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View
} from 'react-native';
import { Stage, Tip } from '../types/journey';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface JourneyStageProps {
  stage: Stage;
}

export function JourneyStage({ stage }: JourneyStageProps) {
  const [expandedStage, setExpandedStage] = useState(false);
  const [expandedSubstages, setExpandedSubstages] = useState<Set<string>>(new Set());

  const toggleStage = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedStage(!expandedStage);
    if (!expandedStage) {
      setExpandedSubstages(new Set());
    }
  };

  const toggleSubstage = (substageId: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const newExpanded = new Set(expandedSubstages);
    if (newExpanded.has(substageId)) {
      newExpanded.delete(substageId);
    } else {
      newExpanded.add(substageId);
    }
    setExpandedSubstages(newExpanded);
  };

  return (
    <View style={styles.stageContainer}>
      <TouchableOpacity style={styles.stageHeader} onPress={toggleStage}>
        <View style={styles.stageHeaderContent}>
          <Text style={styles.stageIcon}>{stage.icon}</Text>
          <View style={styles.stageTitleContainer}>
            <Text style={styles.stageTitle}>{stage.title}</Text>
            <Text style={styles.stageDescription}>{stage.description}</Text>
          </View>
          <Text style={styles.expandIcon}>{expandedStage ? '▼' : '▶'}</Text>
        </View>
      </TouchableOpacity>

      {expandedStage && (
        <View style={styles.substagesContainer}>
          {stage.substages.map((substage) => (
            <View key={substage.id} style={styles.substageContainer}>
              <TouchableOpacity
                style={styles.substageHeader}
                onPress={() => toggleSubstage(substage.id)}
              >
                <View style={styles.substageHeaderContent}>
                  <Text style={styles.substageTitle}>{substage.title}</Text>
                  <Text style={styles.substageExpandIcon}>
                    {expandedSubstages.has(substage.id) ? '▼' : '▶'}
                  </Text>
                </View>
                <Text style={styles.substageDescription}>{substage.description}</Text>
              </TouchableOpacity>

              {expandedSubstages.has(substage.id) && (
                <View style={styles.substageContent}>
                  {substage.painPoints.length > 0 && (
                    <View style={styles.painPointsSection}>
                      <Text style={styles.sectionTitle}>Common Challenges:</Text>
                      {substage.painPoints.map((point, index) => (
                        <View key={index} style={styles.painPointItem}>
                          <Text style={styles.bulletPoint}>•</Text>
                          <Text style={styles.painPointText}>{point}</Text>
                        </View>
                      ))}
                    </View>
                  )}

                  {substage.tips.length > 0 && (
                    <View style={styles.tipsSection}>
                      <Text style={styles.sectionTitle}>💡 Tips to Help:</Text>
                      {substage.tips.map((tip) => (
                        <TipItem key={tip.id} tip={tip} />
                      ))}
                    </View>
                  )}
                </View>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

interface TipItemProps {
  tip: Tip;
}

function TipItem({ tip }: TipItemProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleTip = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const getPriorityColor = () => {
    switch (tip.priority) {
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

  return (
    <TouchableOpacity style={styles.tipContainer} onPress={toggleTip}>
      <View style={styles.tipHeader}>
        <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor() }]} />
        <Text style={styles.tipTitle}>{tip.title}</Text>
        <Text style={styles.tipExpandIcon}>{expanded ? '▼' : '▶'}</Text>
      </View>
      {expanded && <Text style={styles.tipBody}>{tip.body}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  stageContainer: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  stageHeader: {
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  stageHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stageIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  stageTitleContainer: {
    flex: 1,
  },
  stageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  stageDescription: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  expandIcon: {
    fontSize: 18,
    color: '#3498db',
    marginLeft: 8,
  },
  substagesContainer: {
    padding: 8,
  },
  substageContainer: {
    marginBottom: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    overflow: 'hidden',
  },
  substageHeader: {
    padding: 12,
  },
  substageHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  substageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    flex: 1,
  },
  substageExpandIcon: {
    fontSize: 14,
    color: '#3498db',
  },
  substageDescription: {
    fontSize: 13,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  substageContent: {
    padding: 12,
    paddingTop: 0,
  },
  painPointsSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  painPointItem: {
    flexDirection: 'row',
    marginBottom: 6,
    paddingLeft: 8,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#e74c3c',
    marginRight: 8,
    fontWeight: 'bold',
  },
  painPointText: {
    flex: 1,
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
  },
  tipsSection: {
    marginTop: 8,
  },
  tipContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#3498db',
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  tipTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
  },
  tipExpandIcon: {
    fontSize: 12,
    color: '#3498db',
  },
  tipBody: {
    fontSize: 13,
    color: '#555',
    lineHeight: 19,
    marginTop: 8,
    paddingLeft: 16,
  },
});
