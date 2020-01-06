import React from "react";
import {
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Text,
  StyleSheet
} from "react-native";

const GalleryView = props => {
  const artwork = props.artwork;
  const navigation = props.navigation;
  return (
    <View stye={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("SingleView", { id: artwork.id })}
      >
        <ImageBackground source={{ uri: artwork.imageURL }} style={styles.card}>
          <View style={styles.info}>
            <Text style={styles.title}>{artwork.artist}</Text>
            <Text style={styles.text}>Gallery {artwork.gallery}</Text>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    height: 320,
    width: 300,
    margin: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3
  },
  info: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    width: 300,
    height: 40,
    backgroundColor: "#fff",
    overflow: "visible"
  },
  text: {
    fontFamily: "Gill Sans",
    color: "#656565"
  },
  title: {
    fontSize: 15,
    fontFamily: "Gill Sans",
    color: "#656565"
  }
});

export default GalleryView;
