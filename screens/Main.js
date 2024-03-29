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
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [fat, setFat] = useState("");
  // const [weight, setWeight] = useState("");

  const onPress = () => {
    const auth = getAuth();
    const resetForm = () => {
      setEmail("");
      setPassword("");
    };

    const profileUser = () => {
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

    if (!name || !weight) {
      console.log("not sending auth");
      Alert.alert(
        "Error",
        "Missing required fields. Please fill in all fields."
      );
    } else {
      console.log("sending auth");
      profilUser();
      resetForm();
      Alert.alert("Success", "User login");
      navigation.navigate("Main");
    }
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>Votre profile</Text>
        <LabeledTextInput label="Nom" value={name} onChange={setName} />
        <LabeledTextInput
          label="Poids actuelle"
          value={weight}
          onChange={setWeight}
          secure={true}
        />
        <LabeledTextInput
          label="Taux de graisse"
          value={fat}
          onChange={setFat}
        />
        <View style={styles.btnWrapper}>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.btnText}>Ajouter</Text>
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

// import React from "react";
// import {
//   Alert,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   TextInput,
// } from "react-native";

// export default function Main() {
//   return (
//     <View style={styles.wrapper}>
//       <Text>Création de votre profile utilisateur</Text>
//       <Text>Votre nom ?</Text>
//       <Text>Votre objectif ? Sèche ou Masse ?</Text>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   wrapper: {
//     flex: 1,
//   },
// });
