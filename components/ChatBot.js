import { useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { View, StyleSheet } from "react-native";
/* import { Dialogflow_V2 } from "react-native-dialogflow"; */

/* import { dialogflowConfig } from "../env"; */

const BOT_USER = {
  _id: 2,
  name: "Chat-Bot",
  avatar: "https://i.imgur.com/7k12EPD.png",
};

const ChatBot = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );

    setMessages([
      {
        _id: 1,
        text: "Hi! I am your chatbot. How may I help you with today?",
        createdAt: new Date(),
        user: BOT_USER,
      },
    ]);
  }, []);

  /*   const handleGoogleResponse = (result) => {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    sendBotResponse(text);
  };

  const onSend = (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      (result) => handleGoogleResponse(result),
      (error) => console.log(error)
    );
  };

  const sendBotResponse = (text) => {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER,
    };

    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, [msg]),
    }));
  }; */

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
