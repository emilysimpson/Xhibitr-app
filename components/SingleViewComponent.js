import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Animated,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
const { width, height } = Dimensions.get("window");

import FactView from "./FactView";

const SingleViewComponent = props => {
  const artwork = props.artwork;
  const scrollX = new Animated.Value(0);
  return (
    <React.Fragment>
      <View style={styles.favoriteContainer}>
        <Text style={styles.title}>{artwork.title}</Text>
        {artwork.isFavorite ? (
          <Icon name="md-heart" color="#484B89" size={25} />
        ) : (
          <Icon name="md-heart-empty" color="#484B89" size={25} />
        )}
      </View>

      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          source={{ uri: artwork.imageURL }}
          style={styles.image}
        />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.artist}>{artwork.artist}</Text>
        <Text style={styles.metaData}>
          {artwork.medium} | {artwork.date}
        </Text>
      </View>

      <View>
        <FlatList
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToAlignment="center"
          data={artwork.facts}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item, index }) => (
            <View style={styles.factContainer}>
              <FactView item={item} index={index} artwork={artwork} />
              <View
                style={{
                  display: "flex",
                  alignSelf: "flex-end"
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    textTransform: "uppercase",
                    color: "#9A9A9A"
                  }}
                >
                  {index + 1} / {artwork.facts.length}
                </Text>
              </View>
            </View>
          )}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { x: scrollX } }
            }
          ])}
        />
      </View>
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
    paddingBottom: 20,
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
    color: "#9A9A9A"
  },
  factContainer: {
    display: "flex",
    alignItems: "flex-start",
    width: width - 40,
    height: 230,
    overflow: "visible",
    margin: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    borderRadius: 15,
    backgroundColor: "#fff",
    fontFamily: "Gill Sans"
  }
});

export default SingleViewComponent;
