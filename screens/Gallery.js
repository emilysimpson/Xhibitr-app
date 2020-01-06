import React from "react";
import { Text, ScrollView, View, StyleSheet } from "react-native";
import GalleryView from "../components/ArtworkGalleryView";

import database from "../db";

class Gallery extends React.Component {
  constructor() {
    super();

    this.state = {
      artworks: []
    };
    this.addFavorite = this.addFavorite.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
  }

  getUpdate() {
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

  componentDidMount() {
    this.getUpdate();
  }

  addFavorite(id) {
    database
      .collection("artwork")
      .doc(id)
      .update({ isFavorite: true })
      .then(this.getUpdate());
  }

  removeFavorite(id) {
    database
      .collection("artwork")
      .doc(id)
      .update({ isFavorite: false })
      .then(this.getUpdate());
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          {this.state.artworks.map(artwork => (
            <GalleryView
              key={artwork.id}
              navigation={navigation}
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
