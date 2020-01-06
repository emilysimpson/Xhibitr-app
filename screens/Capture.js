import React from "react";
import * as tf from "@tensorflow/tfjs";
import {
  bundleResourceIO,
  decodeJpeg,
  fetch
} from "@tensorflow/tfjs-react-native";
import { Text, View } from "react-native";
import { Camera } from "expo-camera";

// const modelJson = require("../assets/model.json");
// const modelWeights = require("../assets/weights.bin");

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
    // this.setState({ hasPermission, useModel: model });
  }

  render() {
    if (this.state.hasPermission === null) {
      return <View />;
    } else if (this.state.hasPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }

    return (
      <React.Fragment>
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }}>
            {/* <Modal animationType={"slide"} visible={this.state.visibleModal}> */}
            {/* <View style={{ top: 50 }}> */}
            {/* <Button
              title="Close"
              onPress={() => this.setState({ visibleModal: false })}
            /> */}
            {/* </View> */}
            {/* </Modal> */}
          </Camera>
        </View>
        {/* <View style={{ top: 200 }}>
          <TouchableWithoutFeedback
            onPress={() => this.setState({ visibleModal: true })}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Icon name="md-camera" style={{ color: "red" }} size={80} />
          </TouchableWithoutFeedback>
        </View> */}
      </React.Fragment>
    );
  }
}

export default Capture;
