import { useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { View, StyleSheet } from "react-native";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hi! I am your chatbot. How may I help you with today?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Chat-Bot",
          avatar: "https://i.imgur.com/7k12EPD.png",
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
  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default ChatBot;
