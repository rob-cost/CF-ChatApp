import { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

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
        text: 'Hello, how are you doing?',
        sent: true,
        receive: true,
        pending: true,
        user: {
          _id: 2,
          name: 'React Native',
          avatar: '',
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
            backgroundColor: '#075e54',
          },
          left: {
            backgroundColor: '#FFF',
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
            navigation.navigate('ChatBot');
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
          _id: 1,
        }}
      />
      {Platform.OS === 'android' ? (
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
    color: 'white',
    fontSize: 16,
    fontWeight: '300',
    margin: '10',
    textAlign: 'center',
  },
});

export default Chat;
