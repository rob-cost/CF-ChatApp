import { useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";
import styles from "../styles/StartStyles";

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const colors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];

  // Handle Anonymous Auth and navigate to Chat
  const signInUser = () => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(result => {
        console.log("TEST: User Sign-In Successfully", result.user.uid);
        if (color && name) {
          navigation.navigate("Chat", {
            userID: result.user.uid,
            name: name || "Anonymous",
            color,
          });
        } else {
          Alert.alert("Please pick a color and a name");
        }
      })
      .catch(err => {
        Alert.alert("Unable to sign in, try again.");
        console.log(err);
      });
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/background.png")}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Chat-App</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Your Name"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.colorContainer}>
          <Text style={styles.colorTextContainer}>
            Choose Background Color:
          </Text>
          <View style={styles.colorButtonContainer}>
            {colors.map(col => {
              // CREATE A BUTTON FOR EACH COLOR
              return (
                <TouchableOpacity
                  key={col}
                  style={[
                    styles.colorButton,
                    { backgroundColor: col },
                    color === col && styles.selectedColorButton,
                  ]}
                  onPress={() => setColor(col)}
                ></TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={styles.buttonContanier}>
          <TouchableOpacity style={styles.button} onPress={signInUser}>
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Start;
