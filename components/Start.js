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

const Screen1 = ({ navigation }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const colors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/background.png")}
    >
      <Text style={styles.title}>AppTitle</Text>
      <View style={styles.container}>
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
            {colors.map((col) => {
              return (
                <TouchableOpacity
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (color) {
                navigation.navigate("Chat", { name: name, color: color });
              } else {
                Alert.alert("Pick a color");
              }
            }}
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },

  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  container: {
    height: "44%",
    width: "88%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  textInputContainer: {
    flex: 3,
    width: "88%",
    alignItems: "center",
    justifyContent: "center",
  },

  textInput: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
  },

  colorContainer: {
    flex: 5,
    width: "88%",
    alignItems: "center",
    justifyContent: "center",
  },

  colorTextContainer: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 1,
    width: "100%",
  },

  colorButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 8,
  },

  colorButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "purple",
  },

  selectedColorButton: {
    borderWidth: 3,
  },

  buttonContanier: {
    flex: 3,
    width: "88%",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    backgroundColor: "#757083",
    width: "100%",
    padding: 15,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default Screen1;
