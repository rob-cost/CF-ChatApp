import { useEffect } from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";

const Screen2 = ({ route, navigation }) => {
  const { name } = route.params;
  const { color } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text>Chat Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Screen2;
