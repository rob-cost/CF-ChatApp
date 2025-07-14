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
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation, db }) => {
  const { name, color, userID } = route.params; // REN: Received name, userID and color from Start.js while navigating
  const [messages, setMessages] = useState([]); // Create state for message

  useEffect(() => {
    navigation.setOptions({ title: name });

    // Ren: Using firestore onSnapshot, we query messages from firebase and set it to messages state.
    // https://firebase.google.com/docs/firestore/query-data/listen
    let unSubscribeMsgs;
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    unSubscribeMsgs = onSnapshot(q, (querySnapshot) => {
      let newMsgs = [];
      console.log("TEST: Fetch All Messages", querySnapshot);
      querySnapshot.forEach((doc) => {
        newMsgs.push({
          ...doc.data(), // REN: DELETE all the docs in the firebase, then enable this line and delete above 7 lines.
          createdAt: new Date(doc.data().createdAt.toMillis()),
        });
      });
      setMessages(newMsgs);
    });

    // Ren: Clean up code
    return () => {
      if (unSubscribeMsgs) {
        unSubscribeMsgs();
      }
    };
  }, []);

  // sending message function
  const onSend = (newMsg) => {
    // Ren: We push the message to the Firebase using addDoc method
    console.log("TEST: Send Message", newMsg[0]);
    addDoc(collection(db, "messages"), newMsg[0]);
  };

  // customise message bubble
  const renderBubble = (props) => {
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
        onSend={(messages) => onSend(messages)}
        renderBubble={renderBubble}
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
