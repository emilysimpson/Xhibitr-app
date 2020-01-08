import React from "react";
import { Text, View, Image, StyleSheet, Linking } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

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
        {item.link ? (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              height: 180
            }}
          >
            <Icon
              style={{ paddingTop: 5 }}
              name={item.iconName}
              size={30}
              color="#484B89"
            />
            <Text
              style={styles.link}
              onPress={() => Linking.openURL(item.link)}
            >
              {" "}
              {item.text}
            </Text>
          </View>
        ) : null}
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
    width: "75%",
    fontSize: 15
  },
  content: {
    fontSize: 15
  },
  link: {
    display: "flex",
    fontSize: 20,
    color: "#484B89"
  }
});

export default FactView;
