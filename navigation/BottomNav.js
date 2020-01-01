import React from "react";
import { Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import Welcome from "../screens/Welcome";
import Capture from "../screens/Capture";
import Favorites from "../screens/Favorites";
import Gallery from "../screens/Gallery";

const Tabs = createBottomTabNavigator(
  {
    Gallery,
    Capture,
    Favorites
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const { routeName } = navigation.state;
        let tabName;
        tabName =
          routeName === "Gallery"
            ? "ios-color-palette"
            : routeName === "Capture"
            ? "ios-qr-scanner"
            : routeName === "Favorites"
            ? "ios-heart"
            : null;
        return <Icon name={tabName} size={20} />;
      }
    })
  }
);

export default Tabs;
