import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },

  titleContainer: {
    alignItems: "center",
    margin: "20%",
  },

  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  bottomContainer: {
    height: "44%",
    width: "88%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    margin: "10%",
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

export default styles;
