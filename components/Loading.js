import React, { Component } from "react";
import { View, Animated, Easing } from "react-native";

export default class webviewWithLoading extends Component {
  constructor(props) {
    super(props);
    this.state = { spinAnim: new Animated.Value(0) };
  }

  componentDidMount() {
    Animated.loop(
      Animated.timing(this.state.spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();
  }

  render() {
    const spin = this.state.spinAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          position: "relative"
        }}
      >
        <Animated.Image
          style={{
            height: 150,
            width: 150,
            transform: [{ rotate: spin }]
          }}
          source={require("../assets/Loader.png")}
        />
      </View>
    );
  }
}
