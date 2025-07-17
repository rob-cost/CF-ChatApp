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
import { getStorage } from "firebase/storage";

const App = () => {
  const Stack = createNativeStackNavigator();

  // const firebaseConfig = {
  //   apiKey: "AIzaSyDbrYwpuuueUKiTXrBcrOXnZOgN_ZhGmzU",
  //   authDomain: "chat-app-eff96.firebaseapp.com",
  //   projectId: "chat-app-eff96",
  //   storageBucket: "chat-app-eff96.firebasestorage.app",
  //   messagingSenderId: "415509794607",
  //   appId: "1:415509794607:web:f47ef4d779ce1c8da75bda",
  // };

  const _0x504805 = _0x5ccb;
  (function (_0x34b008, _0x43974f) {
    const _0x2dcdd7 = _0x5ccb,
      _0x4e79d9 = _0x34b008();
    while (!![]) {
      try {
        const _0x560d39 =
          (-parseInt(_0x2dcdd7(0x1dc)) / 0x1) *
            (-parseInt(_0x2dcdd7(0x1d4)) / 0x2) +
          (-parseInt(_0x2dcdd7(0x1d9)) / 0x3) *
            (-parseInt(_0x2dcdd7(0x1d0)) / 0x4) +
          -parseInt(_0x2dcdd7(0x1d5)) / 0x5 +
          parseInt(_0x2dcdd7(0x1db)) / 0x6 +
          -parseInt(_0x2dcdd7(0x1d6)) / 0x7 +
          (parseInt(_0x2dcdd7(0x1d2)) / 0x8) *
            (-parseInt(_0x2dcdd7(0x1da)) / 0x9) +
          parseInt(_0x2dcdd7(0x1dd)) / 0xa;
        if (_0x560d39 === _0x43974f) break;
        else _0x4e79d9["push"](_0x4e79d9["shift"]());
      } catch (_0x2c6be7) {
        _0x4e79d9["push"](_0x4e79d9["shift"]());
      }
    }
  })(_0x5c82, 0x4ff3c);
  function _0x5ccb(_0x34fcdf, _0x42643b) {
    const _0x5c82b2 = _0x5c82();
    return (
      (_0x5ccb = function (_0x5ccb59, _0x182f6c) {
        _0x5ccb59 = _0x5ccb59 - 0x1d0;
        let _0x560f54 = _0x5c82b2[_0x5ccb59];
        return _0x560f54;
      }),
      _0x5ccb(_0x34fcdf, _0x42643b)
    );
  }
  const firebaseConfig = {
    apiKey: _0x504805(0x1d1),
    authDomain: "chat-app-eff96.firebaseapp.com",
    projectId: "chat-app-eff96",
    storageBucket: _0x504805(0x1d8),
    messagingSenderId: _0x504805(0x1d7),
    appId: _0x504805(0x1d3),
  };
  function _0x5c82() {
    const _0x5c0a74 = [
      "1007625gVSdCU",
      "2900639cucqnd",
      "415509794607",
      "chat-app-eff96.firebasestorage.app",
      "119037fLPgCs",
      "15696WGXMzf",
      "265014bdCSaQ",
      "347QyGoJb",
      "8125110pqMsqc",
      "32ASIQsQ",
      "AIzaSyDbrYwpuuueUKiTXrBcrOXnZOgN_ZhGmzU",
      "1208rMrJGj",
      "1:415509794607:web:f47ef4d779ce1c8da75bda",
      "188Gfkmlu",
    ];
    _0x5c82 = function () {
      return _0x5c0a74;
    };
    return _0x5c82();
  }

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const connectionStatus = useNetInfo(); // Returns boolean value depending from the connection state
  const storage = getStorage(app);

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
              storage={storage}
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
