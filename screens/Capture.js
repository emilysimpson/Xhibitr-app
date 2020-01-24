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
import Loading from "../components/Loading";
import Clarifai from "clarifai";

const { width } = Dimensions.get("window");
const app = new Clarifai.App({ apiKey: "fa2bc57db65841e28823ea1965a56af7" });

class Capture extends React.Component {
  camera = null;
  state = {
    hasPermission: null,
    isLoading: null,
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
      this.setState({ ...this.state, isLoading: true });
      const photoData = await this.camera.takePictureAsync({
        quality: 0.5,
        base64: true
      });
      this.setState({ ...this.state, photoData });
      await this.analyze();
    }
  };

  analyze = async () => {
    const image = this.state.photoData;
    const model = await app.models.initModel({
      id: "AIC Artwork Recognizer"
    });
    const res = await model.predict({ base64: image.base64 });

    this.setState({
      ...this.state,
      prediction: res.outputs[0].data.concepts[0].name,
      isLoading: false
    });

    const prediction = res.outputs[0].data.concepts[0].name;
    console.log("PREDICTION", prediction);
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
          {this.state.isLoading ? (
            <Loading />
          ) : (
            <View style={styles.cameraBtnContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.takePicture();
                }}
              >
                <Icon name="ios-radio-button-on" color="#484B89" size={80} />
              </TouchableOpacity>
            </View>
          )}
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
