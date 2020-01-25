import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Animated,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import openMap from "react-native-open-maps";

import FactView from "./FactView";

const { width, height } = Dimensions.get("window");

const SingleViewComponent = props => {
  const artwork = props.artwork;
  const favorites = props.favorites;
  const scrollX = new Animated.Value(0);

  return (
    <React.Fragment>
      <View style={styles.favoriteContainer}>
        <Text style={styles.title}>{artwork.title}</Text>
        {favorites[artwork.id] ? (
          <TouchableWithoutFeedback
            onPress={() => props.removeFavorite(`${artwork.id}`)}
          >
            <Icon name="md-heart" color="#484B89" size={25} />
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback
            onPress={() => props.addFavorite(`${artwork.id}`)}
          >
            <Icon name="md-heart-empty" color="#484B89" size={25} />
          </TouchableWithoutFeedback>
        )}
      </View>

      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          source={{
            uri:
              "https://www.artic.edu/iiif/2/" +
              artwork.image_id +
              "/full/400,/0/default.png"
          }}
          style={styles.image}
        />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.artist}>{artwork.artist_title}</Text>
        <Text style={styles.metaData}>
          {artwork.medium_display} | {artwork.date_display}
        </Text>

        {artwork.latitude ? (
          <TouchableOpacity
            onPress={() =>
              openMap({
                provider: "google",
                query: artwork.latitude + "," + artwork.longitude,
                zoom: 30
              })
            }
            style={styles.galleryNumContainer}
          >
            <Text style={styles.gallery}>{artwork.gallery_title}</Text>
            <Icon name="md-open" color="#404040" size={15} />
          </TouchableOpacity>
        ) : (
          <Text style={styles.gallery}>{artwork.gallery_title}</Text>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          {artwork.description.replace(/(<([^>]+)>)/gi, "")}
        </Text>
      </View>

      {Array.isArray(props.similarWorks) ? (
        <>
          <Text style={styles.moreArtTitle}>More art like this</Text>
          <FlatList
            horizontal
            pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            snapToAlignment="center"
            data={props.similarWorks}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item, index }) => (
              <View style={styles.factContainer}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("SingleView", {
                      artwork: item,
                      similarWorks: "NO-PREDICTIONS"
                    })
                  }
                >
                  <Image
                    resizeMode="contain"
                    source={{
                      uri:
                        "https://www.artic.edu/iiif/2/" +
                        item.image_id +
                        "/full/400,/0/default.png"
                    }}
                    style={styles.image}
                  />
                </TouchableOpacity>
              </View>
            )}
            onScroll={Animated.event([
              {
                nativeEvent: { contentOffset: { x: scrollX } }
              }
            ])}
          />
        </>
      ) : null}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  favoriteContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20
  },
  imageContainer: {
    flex: 1,
    paddingBottom: 15,
    height: 250,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    display: "flex",
    height: 200,
    width: 300
  },
  titleContainer: {
    fontFamily: "Gill Sans",
    display: "flex",
    borderBottomColor: "#9A9A9A",
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: "center",
    paddingBottom: 15,
    marginHorizontal: 20
  },
  title: {
    color: "#404040",
    fontSize: 25,
    paddingBottom: 10
  },
  artist: {
    color: "#484B89",
    fontSize: 20,
    paddingBottom: 10
  },
  metaData: {
    textTransform: "uppercase",
    fontSize: 12,
    color: "#9A9A9A",
    paddingBottom: 5
  },
  galleryNumContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  gallery: {
    color: "#404040",
    paddingRight: 5
  },
  infoContainer: {
    width: width - 50,
    display: "flex",
    marginLeft: 25,
    marginTop: 25,
    borderBottomColor: "#9A9A9A",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  infoText: {
    lineHeight: 25
  },
  moreArtTitle: {
    color: "#484B89",
    fontSize: 15,
    textTransform: "uppercase",
    alignSelf: "center"
  },
  factContainer: {
    display: "flex",
    alignItems: "flex-start",
    width: width - 40,
    height: 300,
    overflow: "visible",
    margin: 20,
    padding: 20,
    backgroundColor: "#fff",
    fontFamily: "Gill Sans"
  }
});

export default SingleViewComponent;
