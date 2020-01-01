import React from "react";
import { Text, ScrollView, View, StyleSheet } from "react-native";
import GalleryView from "../components/ArtworkGalleryView";

import data from "../dummyData/data";
import database from "../db";

class Gallery extends React.Component {
  constructor() {
    super();

    this.state = {
      artworks: []
    };
  }

  componentDidMount() {
    database
      .collection("artwork")
      .get()
      .then(snapshot => {
        const initArtworks = [];
        snapshot.forEach(artwork => initArtworks.push(artwork.data()));
        this.setState({
          artworks: initArtworks
        });
      });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          {this.state.artworks.map(artwork => (
            <GalleryView key={artwork.title} artwork={artwork} />
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
