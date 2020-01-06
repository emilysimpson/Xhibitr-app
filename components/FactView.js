import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

const FactView = props => {
  const { item, index } = props;
  return (
    <React.Fragment>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.subContainer}>
        {item.imageURL ? (
          <Image
            style={{ height: 100, width: 100, borderRadius: 100 }}
            source={{ uri: item.imageURL }}
          />
        ) : null}
        <Text style={index === 0 ? styles.content : null}>{item.content}</Text>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "#484B89",
    fontSize: 15,
    paddingBottom: 10,
    textTransform: "uppercase"
  },
  subContainer: {
    display: "flex",
    flexDirection: "row"
  },
  content: {
    marginHorizontal: 10,
    width: "70%"
  }
});

export default FactView;
