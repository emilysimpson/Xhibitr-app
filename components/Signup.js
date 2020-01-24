import React from "react";
import { Button, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

class Signup extends React.Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <TextInput style={styles.inputEmail} placeholder="Email" />
        <TextInput style={styles.inputPassword} placeholder="Password" />
        <View style={styles.button}>
          <Button
            color="#484B89"
            title="SIGN UP"
            onPress={() => navigation.navigate("Gallery")}
          />
        </View>
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
    bottom: 190,
    height: 40,
    width: 150,
    borderRadius: 20
  },
  inputEmail: {
    position: "absolute",
    top: 500,
    backgroundColor: "#fff",
    width: 250,
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignSelf: "center"
  },
  inputPassword: {
    position: "absolute",
    top: 540,
    backgroundColor: "#fff",
    width: 250,
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignSelf: "center"
  },
  signUp: {
    position: "absolute",
    bottom: 130
  }
});

export default Signup;
