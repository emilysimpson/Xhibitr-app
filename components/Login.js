import React from "react";
import { Button, View, Text, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { fb } from "../db";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      method: "login"
    };
  }

  handleSignUp = async () => {
    try {
      await fb
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password);
      this.props.navigation.navigate("Gallery");
    } catch (error) {
      if (error.code === "auth/weak-password") {
        Alert.alert(
          "The password is too weak",
          "Enter a new password and try again",
          [{ text: "OK", onPress: () => console.log("ok pressed") }],
          { cancelable: false }
        );
      } else if (error.code === "auth/invalid-email") {
        Alert.alert(
          "That is an invalid email",
          "Enter a new email and try again",
          [{ text: "OK", onPress: () => console.log("ok pressed") }],
          { cancelable: false }
        );
      }
    }
  };

  handleLogin = async () => {
    let user;
    try {
      user = await fb
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password);
      this.props.navigation.navigate("Gallery");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        Alert.alert(
          "That is wrong password",
          "Enter your password again",
          [{ text: "OK", onPress: () => console.log("ok pressed") }],
          { cancelable: false }
        );
      }
    }
  };

  render() {
    const styles = this.props.styles;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputEmail}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          style={styles.inputPassword}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
        />
        <View style={styles.button}>
          <Button
            color="#484B89"
            title={this.state.method === "login" ? "LOGIN" : "SIGN UP"}
            onPress={
              this.state.method === "login"
                ? this.handleLogin
                : this.handleSignUp
            }
          />
        </View>
        {this.state.method === "login" && (
          <Text
            onPress={() => this.setState({ method: "signup" })}
            style={styles.signUp}
          >
            Don't have an account? Sign up
          </Text>
        )}
      </View>
    );
  }
}

export default Login;
