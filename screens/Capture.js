import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Camera } from "expo-camera";

import "@tensorflow/tfjs-react-native";
import * as model from "../model-analysis/ArtDetectionModel";

const { width } = Dimensions.get("window");

class Capture extends React.Component {
  camera = null;
  state = {
    hasPermission: null,
    photoData: null,
    predictions: null
  };

  async componentDidMount() {
    const camera = await Camera.requestPermissionsAsync();
    const hasPermission = camera.status === "granted";
    this.setState({ hasPermission });
  }

  takePicture = async () => {
    if (this.camera) {
      const photoData = await this.camera.takePictureAsync({ base64: true });
      this.setState({ ...this.state, photoData });

      await this.analyze();
    }
  };

  analyze = async () => {
    const image = this.state.photoData;
    const predictions = await model.analyze(image);
    this.setState({ ...this.state, predictions });
  };

  render() {
    if (this.state.hasPermission === null) {
      return <View />;
    } else if (this.state.hasPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }

    return (
      <View style={{ flex: 1 }}>
        <Camera
          ref={ref => {
            this.camera = ref;
          }}
          style={{ flex: 1, position: "relative" }}
        >
          <View style={styles.cameraBtnContainer}>
            <TouchableOpacity
              onPress={() => {
                this.takePicture();
              }}
            >
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
