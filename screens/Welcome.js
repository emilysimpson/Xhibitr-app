import React from "react";
import { StyleSheet, Button, View, ImageBackground } from "react-native";
import Login from "../components/Login";

class Welcome extends React.Component {
  constructor() {
    super();
  }
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/Xhibitr.png")}
          style={{ width: "100%", height: "100%" }}
        >
          <Login navigation={navigation} styles={styles} />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    backgroundColor: "#E59B77",
    position: "absolute",
    justifyContent: "center",
    alignSelf: "center",
    bottom: 290,
    height: 40,
    width: 150,
    borderRadius: 20
  },
  inputEmail: {
    position: "absolute",
    top: 400,
    backgroundColor: "#fff",
    width: 250,
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignSelf: "center"
  },
  inputPassword: {
    position: "absolute",
    top: 440,
    backgroundColor: "#fff",
    width: 250,
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignSelf: "center"
  },
  signUp: {
    position: "absolute",
    bottom: 230
  }
});

export default Welcome;
