import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert } from "react-native";
import Start from "./components/Start";
import Chat from "./components/Chat";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";
import ChatBot from "./components/ChatBot";
import { useNetInfo } from "@react-native-community/netinfo";

const App = () => {
  const Stack = createNativeStackNavigator();

  const firebaseConfig = {
    apiKey: "AIzaSyDbrYwpuuueUKiTXrBcrOXnZOgN_ZhGmzU",
    authDomain: "chat-app-eff96.firebaseapp.com",
    projectId: "chat-app-eff96",
    storageBucket: "chat-app-eff96.firebasestorage.app",
    messagingSenderId: "415509794607",
    appId: "1:415509794607:web:f47ef4d779ce1c8da75bda",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const connectionStatus = useNetInfo(); // Returns boolean value depending from the connection state

  // Check tthe connection status
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {props => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              {...props}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="ChatBot" component={ChatBot} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
