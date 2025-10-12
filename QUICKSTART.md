# Quick Start Guide - PatientPilot

## Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or later) - [Download here](https://nodejs.org/)
- **npm** or **yarn** (comes with Node.js)
- **Expo Go app** on your phone:
  - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Android - Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

## Installation & Running

### Step 1: Install Dependencies

Open your terminal in the PatientPilot folder and run:

```bash
npm install
```

This will install all required packages (React Native, Expo, etc.)

### Step 2: Start the Development Server

```bash
npm start
```

This will start Expo and show you a QR code in your terminal.

### Step 3: View on Your Phone

**Option A: Scan QR Code (Recommended)**
1. Open the **Expo Go** app on your phone
2. On iOS: Tap "Scan QR Code" and scan the code in your terminal
3. On Android: The Expo Go app should detect the QR code automatically

**Option B: Run on iOS Simulator (Mac only)**
```bash
npm run ios
```

**Option C: Run on Android Emulator**
```bash
npm run android
```

**Option D: Run in Web Browser**
```bash
npm run web
```

## Viewing Your Patient Journey

Once the app loads:

1. You'll see the home screen with a blue card at the top:
   **"🏥 View Full Patient Journey"**

2. Tap that card to see your full patient journey interface

3. The journey has 5 main stages:
   - 🔍 **Awareness** - Recognizing symptoms
   - 🤔 **Consideration** - Choosing providers
   - 📅 **Access** - Scheduling appointments
   - 🏥 **Care Delivery** - Your appointment experience
   - 🔄 **Ongoing Care** - Follow-up and billing

4. Tap any stage to expand it and see substages

5. Tap substages to see pain points and tips

6. Tap individual tips to read full details

## Troubleshooting

### "Command not found: npm"
- Install Node.js from https://nodejs.org/

### Metro bundler issues
```bash
npm start -- --clear
```

### Expo Go not connecting
- Make sure your phone and computer are on the same WiFi network
- Try closing and reopening the Expo Go app

### Module not found errors
```bash
rm -rf node_modules
npm install
```

### TypeScript errors
```bash
npm install --save-dev typescript @types/react
```

## Development Tips

### Hot Reloading
The app automatically reloads when you make changes to the code. No need to restart!

### Shake to Open Menu
Shake your phone (or press `Cmd+D` on iOS simulator / `Cmd+M` on Android) to open the developer menu.

### Debugging
- Press `j` in the terminal to open Chrome DevTools
- Add `console.log()` statements to see output in the terminal

## What's Next?

- Customize colors in `/constants/Colors.ts`
- Add more tips to `/app/data/patient_journey.json`
- Modify the UI in `/components/JourneyStage.tsx`
- Check out `/app/screens/PatientJourneyScreen.tsx` for the main screen

## Need Help?

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Community Forums](https://forums.expo.dev/)

Enjoy building PatientPilot! 🚀
