import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
// const image = require("../assets/wave.png");
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import LabeledTextInput from "./components/LabeledTextInput";
import CustomButton from "./components/CustomButton";

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
          <CustomButton
            style={styles.button}
            onPress={onPress}
            text="Création"
          />
        </View>
      </View>
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
});
