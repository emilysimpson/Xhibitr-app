import React from "react";
import { StyleSheet, Button, View, ImageBackground } from "react-native";

class Welcome extends React.Component {
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
          <View style={styles.button}>
            <Button
              color="#484B89"
              title="GO"
              onPress={() => navigation.navigate("Gallery")}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    backgroundColor: "#E59B77",
    position: "absolute",
    justifyContent: "center",
    alignSelf: "center",
    bottom: 210,
    height: 40,
    width: 150,
    borderRadius: 20
  }
});

export default Welcome;
