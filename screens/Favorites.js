import React from "react";
import { Text, View, FlatList, Dimensions, StyleSheet } from "react-native";
import database from "../db";

import SingleFavorite from "../components/SingleFavorite";

const numCols = 2;

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
      favoritesList: []
    };
  }

  componentDidMount() {
    this.getUpdate();
    this.getFavorites();
  }

  getUpdate = () => {
    database
      .collection("favorites")
      .doc("ZroRtA5AurhsWZ2UtUubB2ojSqE3")
      .onSnapshot(snapshot => {
        const dataObj = snapshot.data();
        const arr = Object.keys(dataObj);
        const filtered = arr
          .filter(key => {
            return dataObj[key];
          })
          .map(strNum => parseInt(strNum));
        this.setState({
          favoritesList: filtered
        });
      });
  };

  getFavorites = () => {
    database
      .collection("artwork")
      .doc("fromAPI")
      .onSnapshot(snapshot => {
        const dataObj = snapshot.data();
        const filtered = dataObj.data.filter(artwork =>
          this.state.favoritesList.includes(artwork.id)
        );
        this.setState({ favorites: filtered });
      });
  };

  formatData = (data, numCols) => {
    const fullRows = Math.floor(this.state.favorites.length / numCols);

    let elsLastRow = this.state.favorites.length - fullRows * numCols;

    while (elsLastRow !== numCols && elsLastRow !== 0) {
      this.state.favorites.push({ blank: true });
      elsLastRow++;
    }

    return data;
  };

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View style={styles.item}>
        <SingleFavorite
          key={index}
          navigation={this.props.navigation}
          artwork={item}
        />
      </View>
    );
  };

  render() {
    return (
      <FlatList
        style={styles.container}
        data={this.formatData(this.state.favorites, numCols)}
        keyExtractor={(item, index) => `${index}`}
        renderItem={this.renderItem}
        numColumns={numCols}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    height: Dimensions.get("window").width / numCols // approximate a square
  },
  itemInvisible: {
    backgroundColor: "transparent"
  },
  itemText: {
    color: "#fff"
  }
});

export default Favorites;
