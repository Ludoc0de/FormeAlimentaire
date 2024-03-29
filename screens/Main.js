import React, { createContext, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
// const image = require("../assets/wave.png");
import { getFirestore } from "firebase/firestore";
import { auth } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import LabeledTextInput from "./components/LabeledTextInput";
import { addDoc, collection } from "firebase/firestore";

export default function Main({ navigation }) {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [fat, setFat] = useState("");
  // const [weight, setWeight] = useState("");
  const database = getFirestore();
  const userProfile = collection(database, "profile");

  const onPress = async () => {
    try {
      const resetForm = () => {
        setName("");
        setWeight("");
        setFat("");
      };

      const auth = getAuth();
      const currentUser = await auth.currentUser; // Wait for user info
      console.log(currentUser);
      const createUserProfile = () => {
        return {
          name: name,
          weight: weight,
          fat: fat,
          uid: uid,
        };
      };

      if (currentUser) {
        const uid = currentUser.uid;
        await addDoc(userProfile, createUserProfile());
        Alert.alert("Success", "User Profile data");
        // resetForm();
      } else {
        console.log("No user is signed in");
        // Handle case where no user is authenticated (e.g., redirect to login)
      }
    } catch (err) {
      console.error(err);
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
