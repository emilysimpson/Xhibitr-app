import React from "react";
import {
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  Button
} from "react-native";
import { Camera } from "expo-camera";
import Icon from "react-native-vector-icons/Ionicons";

class Capture extends React.Component {
  camera = null;

  state = {
    visibleModal: true,
    hasPermission: null
  };

  async componentDidMount() {
    const camera = await Camera.requestPermissionsAsync();
    const hasPermission = camera.status === "granted";
    this.setState({ hasPermission });
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
          <Camera style={{ flex: 1 }} ref={camera => (this.camera = camera)}>
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
