import React from "react";
import * as tf from "@tensorflow/tfjs";
import {
  bundleResourceIO,
  decodeJpeg,
  fetch
} from "@tensorflow/tfjs-react-native";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Camera } from "expo-camera";

// const modelJson = require("../assets/model.json");
// const modelWeights = require("../assets/weights.bin");

const { width } = Dimensions.get("window");

class Capture extends React.Component {
  state = {
    hasPermission: null,
    useModel: {}
  };

  async componentDidMount() {
    const camera = await Camera.requestPermissionsAsync();
    const hasPermission = camera.status === "granted";
    // const model = await tf.loadLayersModel(
    //   bundleResourceIO(modelJson, modelWeights)
    // );
    // console.log("MODEL: ", model);
    this.setState({ hasPermission });
    // set state with : { useModel: model }
  }

  render() {
    if (this.state.hasPermission === null) {
      return <View />;
    } else if (this.state.hasPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }

    return (
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1, position: "relative" }}>
          <View style={styles.cameraBtnContainer}>
            <TouchableOpacity onPress={() => {}}>
              <Icon name="ios-radio-button-on" color="#484B89" size={80} />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cameraBtnContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    bottom: 35,
    left: width / 2 - 30
  }
});
export default Capture;
