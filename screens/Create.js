import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
// const image = require("../assets/wave.png");
// import LabeledTextInput from "./components/LabeledTextInput";
import { auth } from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import LabeledTextInput from "./components/LabeledTextInput";

export default function Create({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const onPress = () => {
    const auth = getAuth();
    const resetForm = () => {
      setEmail("");
      setPassword("");
      setVerifyPassword("");
    };

    const createUser = () => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
        });
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
      createUser();
      resetForm();
      Alert.alert("Success", "User acount created");
      navigation.navigate("Login");
    }
  };
  return (
    <View style={styles.wrapper}>
      {/* <ImageBackground source={image} resizeMode="cover" style={styles.image}> */}
      <View style={styles.container}>
        <Text style={styles.title}>S'INSCRIRE</Text>
        <LabeledTextInput label="Email" value={email} onChange={setEmail} />
        <LabeledTextInput
          label="Mot de passe"
          value={password}
          onChange={setPassword}
          secure={true}
        />
        <LabeledTextInput
          label="Vérification du mot de passe"
          value={verifyPassword}
          onChange={setVerifyPassword}
          secure={true}
        />
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
    justifyContent: "center",
    paddingLeft: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 40,
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
    marginTop: 40,
    width: 350,
  },
  btnText: {
    color: "white",
    fontSize: 20,
  },
});
