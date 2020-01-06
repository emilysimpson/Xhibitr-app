import React from "react";
import { Image, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import Icon from "react-native-vector-icons/Ionicons";

import Welcome from "../screens/Welcome";
import Capture from "../screens/Capture";
import Favorites from "../screens/Favorites";
import Gallery from "../screens/Gallery";
import SingleView from "../screens/ArtworkSingleView";

const Tabs = createBottomTabNavigator(
  {
    Gallery,
    Capture,
    Favorites
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
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
        return <Icon name={tabName} color={tintColor} size={20} />;
      },
      tabBarOptions: {
        activeTintColor: "#484B89",
        inactiveTintColor: "#9A9A9A"
      }
    })
  }
);

const screens = createStackNavigator(
  {
    Welcome,
    SingleView,
    TabsNav: {
      screen: Tabs,
      navigationOptions: ({ navigation }) => {
        const { routeName } = navigation.state.routes[navigation.state.index];
        return {
          headerLeft: () => (
            <Text
              style={{
                fontSize: 20,
                color: "#E59B77",
                textTransform: "uppercase",
                fontFamily: "Gill Sans"
              }}
            >
              {routeName}
            </Text>
          )
        };
      }
    }
  },
  {
    initialRouteName: "Welcome",
    defaultNavigationOptions: {
      headerStyle: {
        height: 70,
        backgroundColor: "white",
        borderBottomColor: "transparent",
        elevation: 0 // for android
      },
      headerLeftContainerStyle: {
        marginLeft: 20
      },
      headerBackImage: (
        <Icon name="ios-arrow-round-back" color="#E59B77" size={30} />
      ),
      headerBackTitle: null,
      headerRight: <Image source={require("../assets/title.png")} />,
      headerRightContainerStyle: {
        alignItems: "center",
        paddingRight: 30
      }
    }
  }
);

export default createAppContainer(screens);
