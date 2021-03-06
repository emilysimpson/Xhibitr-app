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

  render() {
    const navigation = this.props.navigation;
    const artwork = navigation.getParam("artwork", "NO-ARTWORK");
    const prediction = navigation.getParam("prediction", "NO-PREDICTIONS");
    const similarWorks = navigation.getParam("similarWorks", "NO-SIMILAR");
    const favorites = navigation.getParam("favorites", "NO-FAVORITES");
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
        >
          <SingleViewComponent
            artwork={artwork}
            favorites={favorites}
            prediction={prediction}
            similarWorks={similarWorks}
            navigation={navigation}
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
