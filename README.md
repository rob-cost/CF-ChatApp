#  Chat App

##  Project Overview

The Chat App is a cross-platform mobile application built using React Native and Expo. It allows users to chat in real-time room with additional multimedia functionality such as sharing images, taking photos, and sending location data. The app uses Firebase for authentication, cloud storage, and real-time database capabilities.

---

##  Table of Contents

- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Usage](#-usage)

---

##  Tech Stack

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Firebase Authentication](https://firebase.google.com/products/auth)
- [Firebase Firestore Database](https://firebase.google.com/products/firestore)
- [Firebase Cloud Storage](https://firebase.google.com/products/storage)
- [Gifted Chat Library](https://github.com/FaridSafi/react-native-gifted-chat)
- [React Native Maps](https://github.com/react-native-maps/react-native-maps)

---

##  Features

- ✅ Built entirely in **React Native** using the **Expo** CLI
- ✅ **Gifted Chat** is used to provide a smooth and customizable chat UI
- ✅ Styled according to a predefined screen design
- ✅ **Anonymous authentication** using Firebase Authentication
- ✅ Real-time **chat functionality** powered by Firestore
- ✅ **Local data storage** for offline message persistence
- ✅ Ability to **pick and send images** from the user’s library
- ✅ Ability to **take photos** using the device camera and send them
- ✅ All images are stored in **Firebase Cloud Storage**
- ✅ Ability to **send current location**, displayed as a map inside the chat

---

##  Usage

### Prerequisites

- Node.js
- Expo CLI (`npm install -g expo-cli`)
- Firebase project with Firestore, Storage, and Authentication enabled

### Getting Started

1. Clone this repo:
   ```bash
   git clone https://github.com/rob-cost/CF-ChatApp.git
   cd CF-ChatApp
   ```

2. Install dependencies:
   ```bash
   npm install
   npm I 
   ```
   
3. Set up Firebase credentials:
   Go to your Firebase general settings and copy the project credentials
   The Firebase configuration is in App.js
   ```bash
   FIREBASE_API_KEY=your-api-key
   FIREBASE_AUTH_DOMAIN=your-auth-domain
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_STORAGE_BUCKET=your-storage-bucket
   FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   FIREBASE_APP_ID=your-app-id
   ```
   
4. Run the App
   ```bash
   npx expo start
   ```

###  How to use the app

1. Launch the app.
2. Enter a username, select a background color, and start chatting.
3. Send text messages
4. Tap the + button to send images from your library, share your location, or take a picture
5. View messages and media from all users in real time

