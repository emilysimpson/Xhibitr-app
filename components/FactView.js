import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

const FactView = props => {
  const { item, index } = props;
  return (
    <React.Fragment>
      {item.title ? <Text style={styles.title}>{item.title}</Text> : null}

      <View style={styles.subContainer}>
        {item.imageURL ? (
          <Image
            style={{ height: 100, width: 100, borderRadius: 100 }}
            source={{ uri: item.imageURL }}
          />
        ) : null}
        <Text style={index === 0 ? styles.contentArtist : styles.content}>
          {item.content}
        </Text>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "#484B89",
    fontSize: 15,
    paddingBottom: 15,
    textTransform: "uppercase",
    alignSelf: "center"
  },
  subContainer: {
    display: "flex",
    flexDirection: "row"
  },
  contentArtist: {
    paddingLeft: 10,
    paddingRight: 20,
    width: "70%",
    fontSize: 15
  },
  content: {
    fontSize: 15
  }
});

export default FactView;
