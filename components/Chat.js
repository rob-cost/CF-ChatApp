import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
  const { name } = route.params;
  const { color } = route.params;
  const [messages, setMessages] = useState([]); // Create state for message

  useEffect(() => {
    navigation.setOptions({ title: name });
    setMessages([
      // system message appearing when enter the chat
      {
        _id: 1,
        createdAt: new Date(),
        text: `${name} has entered the chat`,
        system: true,
      },
      // default automatic user message
      {
        _id: 2,
        createdAt: new Date(),
        text: "Hello, how are you doing?",
        sent: true,
        receive: true,
        pending: true,
        user: {
          _id: 2,
          name: "React Native",
          avatar: "",
        },
      },
    ]);
  }, []);

  // sending message function
  const onSend = (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  // customise message bubble
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
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
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        renderBubble={renderBubble}
        user={{
          _id: 1,
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
});

export default Chat;
