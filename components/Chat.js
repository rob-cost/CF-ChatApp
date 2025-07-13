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
      /*
      REN: DOC looks like
      {"_id": "7ff117f1-ba59-468a-a65a-9ecf63c244cf", 
      "createdAt": {"nanoseconds": 606000000, "seconds": 1752325180, "type": "firestore/timestamp/1.0"}, 
      "text": "Hello", 
      "user": {"_id": 1}} // for some docs on firebase name is missing
       ,
       {"_id": "7f86dff2-70fb-46c1-ba95-372724bf174c", 
       "createdAt": {"nanoseconds": 595000000, "seconds": 1752242731, "type": "firestore/timestamp/1.0"}, 
       "text": "Ciao", 
       "user": {"_id": {"userID": "OEvOFzUv3NaEPe75ir2nCCFr20C3"}, "name": {"name": "Roberto"}}} for some its even wierd
      */
      querySnapshot.forEach((doc) => {
        newMsgs.push({
          _id: doc.data()._id, // REN: Not sure _id or id, we need to test it later
          // text: doc.data().text || null,
          // user: {
          //   _id: doc.data().user._id,
          //   name:
          //     doc.data().user.name &&
          //     (doc.data().user.name.name || 'Anonymous'), // REN: This is the culprit for userName.toUpperCase() not function error
          // },
          ...doc.data(), // REN: DELETE all the docs in the firebase, then enable this line and delete above 7 lines.
          createdAt: new Date(doc.data().createdAt.toMillis()),
        });
      });
      setMessages(newMsgs);
      // newMsgs.length
      //   ? setMessages(newMsgs)
      //   : Alert.alert("Error fetching messages!");
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
          name: name,
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
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
