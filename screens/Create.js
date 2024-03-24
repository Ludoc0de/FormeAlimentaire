import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
// const image = require("../assets/wave.png");
// import LabeledTextInput from "./components/LabeledTextInput";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Create({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const onPress = async () => {
    try {
      const resetForm = () => {
        setEmail("");
        setPassword("");
        setVerifyPassword("");
      };
      if (!email || !password || !verifyPassword) {
        console.log("not sending auth");
        Alert.alert(
          "Error",
          "Missing required fields. Please fill in all fields."
        );
      } else if (password !== verifyPassword) {
        console.log("password it's not the same ");
        Alert.alert(
          "Error",
          "Password it's not the same. Please verify your password."
        );
      } else {
        console.log("sending auth");
        await createUserWithEmailAndPassword(auth, email, password);
        resetForm();
        Alert.alert("Success", "User acount created");
        navigation.navigate("Login");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <View style={styles.wrapper}>
      {/* <ImageBackground source={image} resizeMode="cover" style={styles.image}> */}
      <View style={styles.container}>
        <Text style={styles.title}>S'INSCRIRE</Text>
        {/* <LabeledTextInput
          label="Email"
          value={email}
          placeholder={"votre email"}
          onChange={setEmail}
          textColor="#FF70BC"
        />

        <LabeledTextInput
          label="Mot de passe"
          value={password}
          placeholder={"votre mot de passe"}
          onChange={setPassword}
          textColor="#FF70BC"
          secure={true}
        />

        <LabeledTextInput
          label="Vérifier le mot de passe"
          value={verifyPassword}
          placeholder={"vérification du mot de passe"}
          onChange={setVerifyPassword}
          textColor="#FF70BC"
          secure={true}
        /> */}

        <View style={styles.btnWrapper}>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.btnText}>Création</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </ImageBackground> */}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#f9faf4",
    justifyContent: "space-evenly",
    paddingLeft: 20,
  },
  title: {
    marginTop: 10,
    fontSize: 24,
    color: "#E8664B",
  },

  btnWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingRight: 24,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#E8664B",
    borderRadius: 10,
    padding: 6,
    width: 120,
  },
  btnText: {
    color: "white",
    fontSize: 20,
  },
});