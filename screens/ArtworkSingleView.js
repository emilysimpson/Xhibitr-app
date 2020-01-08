import React from "react";
import { View, Image, ScrollView, Text, StyleSheet } from "react-native";

import SingleViewComponent from "../components/SingleViewComponent";

import database from "../db";

class SingleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artwork: {}
    };
  }

  componentDidMount() {
    const navigation = this.props.navigation;
    const id = JSON.stringify(navigation.getParam("id", "NO-ID"));

    database
      .collection("artwork")
      .doc(id)
      .get()
      .then(doc => {
        this.setState({ artwork: doc.data() });
      });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
        >
          <SingleViewComponent
            artwork={this.state.artwork}
            addFavorite={this.props.navigation.state.params.addFavorite}
            removeFavorite={this.props.navigation.state.params.removeFavorite}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  }
});

export default SingleView;
