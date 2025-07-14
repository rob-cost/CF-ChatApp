import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected }) => {
  const { name, color, userID } = route.params; // Received name, userID and color from Start.js while navigating
  const [messages, setMessages] = useState([]); // Create state for message
  let unSubscribeMsgs;

  useEffect(() => {
    // Using navigation.setOptions we assing the name as title of the bar header
    navigation.setOptions({ title: name });

    // Using firestore onSnapshot, we query messages from firebase and set it to messages state.
    if (isConnected === true) {
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unSubscribeMsgs = onSnapshot(q, querySnapshot => {
        let newMsgs = [];
        console.log("TEST: Fetch All Messages", querySnapshot);
        querySnapshot.forEach(doc => {
          newMsgs.push({
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });

        // We set the value of messages with the value fetched from the db
        cacheMessages(newMsgs);
        setMessages(newMsgs);
        console.log(isConnected);
        console.log(cacheMessages);
      });
    } else {
      loadCacheMessages();
    }

    // Ren: Clean up code
    return () => {
      if (unSubscribeMsgs) {
        unSubscribeMsgs();
        unSubscribeMsgs = null;
      }
    };
  }, [isConnected]);

  // We cache the messages using async storage function after they are fetched from the db
  const cacheMessages = async msgsToCache => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(msgsToCache));
    } catch (err) {
      console.log("Unable to cache messages " + err.message);
    }
  };

  // We load the messages from the cache in case of no connection
  const loadCacheMessages = async () => {
    try {
      const cachedMsgs = await AsyncStorage.getItem("messages");
      if (cachedMsgs) {
        setMessages(JSON.parse(cachedMsgs));
      } else {
        setMessages([]);
      }
    } catch (err) {
      console.log("Unable to load cache messages");
      setMessages([]);
    }
    console.log(messages);
  };

  // sending message function
  const onSend = newMsg => {
    // We push the message to the Firebase using addDoc method
    console.log("TEST: Send Message", newMsg[0]);
    addDoc(collection(db, "messages"), newMsg[0]);
  };

  // customise message bubble
  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#075e54",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  // override input toolbar if connection is lost
  const renderInputToolbar = props => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ChatBot");
          }}
        >
          <Text style={styles.chatbotText}>Ask Chat-Bot!</Text>
        </TouchableOpacity>
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        user={{
          _id: userID,
          name: name || "Anonymous",
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
    </View>
  );
};

/* --- STYLE OF THE PAGE --- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatbotText: {
    color: "white",
    fontSize: 16,
    fontWeight: "300",
    margin: "10",
    textAlign: "center",
  },
});

export default Chat;
