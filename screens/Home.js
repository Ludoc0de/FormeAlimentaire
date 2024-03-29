import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { auth } from "../firebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
const image = require("../assets/sport01.jpg");

export default function Home({ navigation }) {
  const auth = getAuth();
  const [user, setUser] = useState(auth.currentUser);
  console.log(user);
  // const handleLogout = () => {
  //   signOut(auth);
  // };

  const navigateToLogin = () => navigation.navigate("Login");
  const navigateToMain = () => navigation.navigate("Main");
  const navigateToCreate = () => navigation.navigate("Create");

  return (
    <SafeAreaView style={styles.wrapper}>
      <Image source={image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>Forme Alimentaire!</Text>
      {user ? (
        <TouchableOpacity onPress={navigateToMain}>
          <Text style={styles.btnStyle}>Objectif!</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={navigateToLogin}>
          <Text style={styles.btnStyle}>SE CONNECTER</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={navigateToCreate}>
        <Text style={styles.btnText}>
          Vous n'avez pas de compte? S'inscrire
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#f9faf4",
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  title: {
    color: "#E8664B",
    fontSize: 35,
  },
  btnStyle: {
    marginVertical: 30,
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "#E8664B",
    color: "white",
    borderRadius: 15,
    padding: 10,
    width: 300,
  },
  btnText: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    textAlignVertical: "center",
    color: "#E8664B",
    width: 300,
    paddingBottom: 20,
  },
});
