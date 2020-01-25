import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Vibration
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Camera } from "expo-camera";
import Loading from "../components/Loading";
import Clarifai from "clarifai";
import database from "../db";

const { width } = Dimensions.get("window");
const app = new Clarifai.App({ apiKey: "fa2bc57db65841e28823ea1965a56af7" });

class Capture extends React.Component {
  camera = null;
  state = {
    hasPermission: null,
    isLoading: null,
    photoData: null,
    predictions: null,
    artworks: []
  };

  async componentDidMount() {
    const camera = await Camera.requestPermissionsAsync();
    const hasPermission = camera.status === "granted";
    this.setState({ hasPermission });
    this.getArt();
  }

  getArt = () => {
    database
      .collection("artwork")
      .doc("fromAPI")
      .get()
      .then(snapshot => {
        const dataObj = snapshot.data();
        const initArtworks = [];
        dataObj.data.forEach(artwork => initArtworks.push(artwork));
        this.setState({
          artworks: initArtworks
        });
      });
  };

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

    // the array of all predictions
    const prediction = res.outputs[0].data.concepts;
    // grab the top prediction
    const recognizedArt = this.state.artworks.filter(
      artwork => artwork.id == prediction[0].name
    );
    // get an array of the lower-ranked predictions titles
    const titles = [];
    prediction.forEach(item => titles.push(item.name));
    // set the similar art objects in an array
    let similarWorks = [];
    for (let i = 1; i < titles.length; i++) {
      let artMatch = this.state.artworks.filter(item => item.id == titles[i]);
      if (artMatch[0]) similarWorks.push(artMatch[0]);
    }

    Vibration.vibrate(200);

    this.props.navigation.navigate("SingleView", {
      artwork: recognizedArt[0],
      prediction: prediction,
      similarWorks: similarWorks
    });
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
