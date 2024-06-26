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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import LabeledTextInput from "./components/LabeledTextInput";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onPress = () => {
    const auth = getAuth();
    const resetForm = () => {
      setEmail("");
      setPassword("");
    };

    const loginUser = () => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
        });
    };

    if (!email || !password) {
      console.log("not sending auth");
      Alert.alert(
        "Error",
        "Missing required fields. Please fill in all fields."
      );
    } else {
      console.log("sending auth");
      loginUser();
      resetForm();
      Alert.alert("Success", "User login");
      navigation.navigate("Main");
    }
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>SE CONNECTER</Text>
        <LabeledTextInput label="Email" value={email} onChange={setEmail} />
        <LabeledTextInput
          label="Mot de passe"
          value={password}
          onChange={setPassword}
          secure={true}
        />
        <View style={styles.btnWrapper}>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.btnText}>Se connecter</Text>
          </TouchableOpacity>
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
