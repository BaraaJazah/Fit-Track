import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Tabs } from "expo-router";
import { useAppSelector } from "../../hooks/storeHook";
import {
  Home,
  HomeWhite,
  person,
  personWhite,
  chefHat,
  ChefHatWhite,
  plusWhite,
  bicycle,
  bicycleWhite,
} from "../../assets/icons/home";

const { width, height } = Dimensions.get("window");

export default function TabsLayout() {
  const { themeData, themeName } = useAppSelector((state) => state.theme);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: "shift", // تغيير طريقة الانتقال
        lazy: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          lazy: false,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.view}>
              <View
                style={[
                  styles.viewIcon,
                  {
                    backgroundColor: focused
                      ? themeData["background-primary"]
                      : "",
                  },
                ]}
              >
                <Image
                  source={focused ? HomeWhite : Home}
                  style={{ width: 24, height: 24 }}
                />
              </View>
              {/* <Text style={[styles.viewText, { color: focused ? themeData["background-primary"] : "#ccc" }]}> Home </Text> */}
            </View>
          ),
          tabBarStyle: {
            height: height * 0.08,
            backgroundColor: themeData["background-secondary-2"],
          },
          tabBarButton: (props) => (
            <TouchableOpacity {...props} activeOpacity={1} />
          ),
        }}
      />

      <Tabs.Screen
        name="Dish"
        options={{
          lazy: false,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.view}>
              <View
                style={[
                  styles.viewIcon,
                  {
                    backgroundColor: focused
                      ? themeData["background-primary"]
                      : "",
                  },
                ]}
              >
                <Image
                  source={focused ? ChefHatWhite : chefHat}
                  style={{ width: 30, height: 30 }}
                />
              </View>
            </View>
          ),
          tabBarStyle: {
            height: height * 0.08,
            backgroundColor: themeData["background-secondary-2"],
          },
          tabBarButton: (props) => (
            <TouchableOpacity {...props} activeOpacity={1} />
          ),
        }}
      />

      <Tabs.Screen
        name="Add"
        options={{
          lazy: false,
          headerShown: false,
          tabBarShowLabel: false,

          tabBarIcon: ({ focused }) => (
            <View style={[styles.viewAdd, {}]}>
              <View
                style={[
                  styles.viewIconAdd,
                  {
                    backgroundColor: focused
                      ? themeData["background-primary"]
                      : "#ccc",
                  },
                ]}
              >
                <Image
                  source={focused ? plusWhite : plusWhite}
                  style={{ width: 22, height: 22 }}
                />
              </View>
            </View>
          ),
          tabBarStyle: {
            height: height * 0.08,
            backgroundColor: themeData["background-secondary-2"],
          },
          tabBarButton: (props) => (
            <TouchableOpacity {...props} activeOpacity={1} />
          ),
        }}
      />

      <Tabs.Screen
        name="Exercise"
        options={{
          lazy: false,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.view}>
              <View
                style={[
                  styles.viewIcon,
                  {
                    backgroundColor: focused
                      ? themeData["background-primary"]
                      : "",
                  },
                ]}
              >
                <Image
                  source={focused ? bicycleWhite : bicycle}
                  style={{ width: 26, height: 26 }}
                />
              </View>
            </View>
          ),
          tabBarStyle: {
            height: height * 0.08,
            backgroundColor: themeData["background-secondary-2"],
          },

          tabBarButton: (props) => (
            <TouchableOpacity {...props} activeOpacity={1} />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          lazy: false,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.view}>
              <View
                style={[
                  styles.viewIcon,
                  {
                    backgroundColor: focused
                      ? themeData["background-primary"]
                      : "",
                  },
                ]}
              >
                <Image
                  source={focused ? personWhite : person}
                  style={{ width: 26, height: 26 }}
                />
              </View>
            </View>
          ),
          tabBarStyle: {
            height: height * 0.08,
            backgroundColor: themeData["background-secondary-2"],
          },
          tabBarButton: (props) => (
            <TouchableOpacity {...props} activeOpacity={1} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  view: {
    height: height * 0.07,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
  },
  viewIcon: {
    height: 46,
    width: 46,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  viewAdd: {
    height: width * 0.2,
    width: width * 0.2,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -(height * 0.05),
  },
  viewIconAdd: {
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
