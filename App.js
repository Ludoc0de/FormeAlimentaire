import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import homeScreen from "./screens/Home";
import createScreen from "./screens/Create";
// import loginScreen from "./screens/Login";
// import mainScreen from "./screens/Main";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={homeScreen} />
        <Stack.Screen name="Create" component={createScreen} />
        {/* <Stack.Screen
        name="Login"
        component={loginScreen}
        options={createScreenStyles}
        />
        <Stack.Screen
        name="Main"
        component={mainScreen}
        options={mainScreenStyles}
      /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
