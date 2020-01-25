import React from "react";
import {
  View,
  TouchableWithoutFeedback,
  Image,
  StyleSheet
} from "react-native";

const SingleFavorite = props => {
  return (
    <View>
      <TouchableWithoutFeedback
        onPress={() =>
          props.navigation.navigate("SingleView", { id: props.artwork.id })
        }
      >
        <Image
          source={{
            uri:
              "https://www.artic.edu/iiif/2/" +
              props.artwork.image_id +
              "/full/400,/0/default.png"
          }}
          style={styles.image}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 200,
    width: 200,
    margin: 10
  },
  image: {
    display: "flex",
    height: 170,
    width: 170
  }
});

export default SingleFavorite;
