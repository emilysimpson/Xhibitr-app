import React from "react";
import { Text, ScrollView, View, StyleSheet } from "react-native";
import { AppLoading } from "expo";
import GalleryView from "../components/ArtworkGalleryView";

import database from "../db";

class Gallery extends React.Component {
  constructor() {
    super();

    this.state = {
      artworks: [],
      favorites: {},
      isLoadingComplete: false
    };
    this.addFavorite = this.addFavorite.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
  }

  // getUpdate() {
  //   database
  //     .collection("artwork")
  //     .get()
  //     .then(snapshot => {
  //       const initArtworks = [];
  //       snapshot.forEach(artwork => initArtworks.push(artwork.data()));
  //       this.setState({
  //         artworks: initArtworks
  //       });
  //     });
  // }

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

  getFaves = () => {
    database
      .collection("favorites")
      .doc("ZroRtA5AurhsWZ2UtUubB2ojSqE3")
      .get()
      .then(snapshot => {
        const dataObj = snapshot.data();
        this.setState({
          favorites: dataObj
        });
      });
  };

  componentDidMount() {
    // this.getUpdate();
    this.getArt();
    this.getFaves();
  }

  addFavorite(id) {
    let updateObj = {};
    updateObj[id] = true;
    database
      .collection("favorites")
      // hard-coding user id for now
      .doc("ZroRtA5AurhsWZ2UtUubB2ojSqE3")
      .update(updateObj)
      .then(this.getFaves());
  }

  removeFavorite(id) {
    let updateObj = {};
    updateObj[id] = false;
    database
      .collection("favorites")
      .doc("ZroRtA5AurhsWZ2UtUubB2ojSqE3")
      .update(updateObj)
      .then(this.getFaves());
  }

  render() {
    const { navigation } = this.props;
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this.getArt}
          onError={error => console.warn(error)}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.container}
        >
          {this.state.artworks.map(artwork => (
            <GalleryView
              key={artwork.id}
              navigation={navigation}
              favorites={this.state.favorites}
              artwork={artwork}
              addFavorite={this.addFavorite}
              removeFavorite={this.removeFavorite}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Gallery;
