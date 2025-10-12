# PatientPilot - Patient Journey Guide

## Overview

PatientPilot helps patients navigate their healthcare journey by providing tips and guidance for each stage of the medical process. The app features an expandable, scrollable interface that organizes information by journey stages, substages, pain points, and actionable tips.

## Data Structure

### patient_journey.json

The main data file contains a hierarchical structure:

```
PatientJourneyData
├── stages[]
│   ├── id: string
│   ├── title: string
│   ├── description: string
│   ├── order: number
│   ├── icon: emoji string
│   └── substages[]
│       ├── id: string
│       ├── title: string
│       ├── description: string
│       ├── painPoints: string[]
│       └── tips[]
│           ├── id: string
│           ├── title: string
│           ├── body: string
│           └── priority: 'high' | 'medium' | 'low'
└── metadata
    ├── version: string
    ├── lastUpdated: string
    ├── source: string
    ├── totalStages: number
    └── totalSubstages: number
```

## The 5 Main Journey Stages

1. **Awareness** 🔍 - Recognizing symptoms and starting your healthcare journey
   - Symptom/Health Need
   - Online Diagnosis/Dr. Google
   - Type of Facility/Specialist
   - Locations: What is Near Me

2. **Consideration** 🤔 - Choosing the right healthcare provider
   - Word of Mouth/Referrals
   - Website/Online Reviews
   - Provider Search
   - Insurance Coverage

3. **Access** 📅 - Scheduling and preparing for your appointment
   - Self-Schedule (Online)
   - Call Center
   - Pricing Transparency/Estimates
   - Prior Authorizations
   - Reminders/Advance Paperwork
   - MyChart Signup

4. **Care Delivery** 🏥 - Your appointment and treatment experience
   - Preparing for Your Appointment
   - Traveling to Appointment
   - Check-in/Registration
   - Wait & Rooming
   - Exam Room/Procedure
   - After-Visit Summary (AVS) & Instructions
   - Labs/Scans

5. **Ongoing Care** 🔄 - Follow-up and continuing your health journey
   - Test Results
   - Billing / Explanations of Benefits
   - Follow-up Scheduling / Specialty Referrals
   - Questions/New Symptoms/MyChart Messaging
   - Preventive Reminders (Population Health/Health Equity)

## Components

### JourneyStage Component

The main component that renders each stage with expandable substages and tips.

**Features:**
- Smooth animations when expanding/collapsing
- Three-level hierarchy (Stage → Substage → Tips)
- Visual priority indicators for tips (high/medium/low)
- Pain points listed before tips for context
- Responsive layout

**Usage:**
```tsx
import { JourneyStage } from '../components/JourneyStage';

<JourneyStage stage={stageData} />
```

### PatientJourneyScreen

Full-screen implementation showing all stages in a scrollable view.

## Tip Priority System

Tips are categorized by priority to help users focus on the most important actions:

- **High Priority** 🔴 - Critical actions that significantly impact care quality or outcomes
- **Medium Priority** 🟠 - Important actions that improve the healthcare experience
- **Low Priority** 🔵 - Helpful suggestions that provide additional convenience

## Adding New Content

To add new tips or stages:

1. Edit `/app/data/patient_journey.json`
2. Follow the existing structure
3. Ensure all IDs are unique
4. Use descriptive titles and clear, actionable body text
5. Assign appropriate priority levels
6. Update the metadata section

## TypeScript Types

All types are defined in `/app/types/journey.ts`:
- `PatientJourneyData` - Root data structure
- `Stage` - Main journey stage
- `Substage` - Sub-category within a stage
- `Tip` - Individual actionable tip

## Future Enhancements

Potential features to add:
- Search functionality
- Bookmarking favorite tips
- Personal notes on each tip
- Progress tracking
- Share tips with family/caregivers
- Notifications/reminders based on journey stage
- Integration with calendar for appointments
- Offline support

## Credits

Based on "Patient Journey & Pain Points" by Andrew Varyu, 2025
