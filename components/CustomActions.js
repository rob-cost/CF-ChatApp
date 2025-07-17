import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/CustomActionsStyle";

const CustomActions = ({
  wrapperStyle,
  iconTextStyle,
  onSend,
  storage,
  userID,
}) => {
  const actionSheet = useActionSheet();
  const messageID = uuidv4();

  const onActionPress = () => {
    const options = [
      "Choose From Library",
      "Take Picture",
      "Send Location",
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;
    actionSheet.showActionSheetWithOptions(
      { options, cancelButtonIndex },
      async buttonIndex => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            getLocation();
          default:
        }
      }
    );
  };

  // we are sending the current location data
  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();

    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      console.log("TEST: The location received: ", location);
      if (location) {
        onSend([
          // must be an array
          {
            _id: messageID, // must have a message ID
            createdAt: new Date(),
            user: {
              _id: userID,
            },

            location: {
              longitude: location.coords.longitude,
              latitude: location.coords.latitude,
            },
          },
        ]);
      } else Alert.alert("Error occurred while fetching location");
    } else {
      Alert.alert("Permissions to read location aren't granted");
    }
  };
  // we are giving unique name to a created image
  const generateReference = uri => {
    const timeStamp = new Date().getTime();
    const imageName = uri.split("/")[uri.split("/").length - 1];
    return `${userID}-${timeStamp}-${imageName}`;
  };

  // we created a function for uploading and sending images
  const uploadAndSendImage = async imageURI => {
    console.log("TEST: Image URI", imageURI);
    if (!imageURI) {
      console.log("Image URI is undefined or not existing");
      return;
    }
    const uniqueRefString = generateReference(imageURI);
    const response = await fetch(imageURI);
    const blob = await response.blob();
    const newUploadRef = ref(storage, uniqueRefString);
    uploadBytes(newUploadRef, blob).then(async snapshot => {
      console.log("File has been uploaded successfully");
      const imageURL = await getDownloadURL(snapshot.ref);
      onSend([
        // must be an array
        {
          _id: messageID, // must have a message ID
          createdAt: new Date(),
          user: {
            _id: userID,
          },

          image: imageURL,
        },
      ]);
    });
  };

  // we can select images and videos through ImagePicker library
  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) {
        await uploadAndSendImage(result.assets[0].uri);
      } else if (result.canceled) {
        console.log("Nothing selected");
      } else Alert.alert("Permissions haven't been granted.");
    }
  };

  // we can take photos using ImagePicker library
  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) {
        await uploadAndSendImage(result.assets[0].uri);
      } else Alert.alert("Permissions haven't been granted.");
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onActionPress}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomActions;
