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
import CustomButton from "./components/CustomButton";
import PickerSelect from "./components/PickerSelect";

export default function Main({ navigation }) {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState();
  const [fat, setFat] = useState();
  const [activity, setActivity] = useState();
  // const [weight, setWeight] = useState("");
  const database = getFirestore();
  const userProfile = collection(database, "profile");
  const activityValues = [
    { label: "Choisir la récurrence", value: "" },
    { label: "pas de pratique sportive", value: 1.15 },
    { label: "1 à 2 fois par semaine", value: 1.25 },
    { label: "3 à 5 fois par semaine", value: 1.4 },
    { label: "6 à 7 fois par semaine", value: 1.55 },
    { label: "7 à 8 fois par semaine", value: 1.7 },
  ];

  const maintenance = Math.round(
    (370 + 21.6 * (1 - Number(fat / 100)) * Number(weight)) * Number(activity)
  );

  const onPress = async () => {
    try {
      const resetForm = () => {
        setName("");
        setWeight("");
        setFat("");
      };

      const auth = getAuth();
      const currentUser = await auth.currentUser;
      console.log("user", currentUser);

      const createUserProfile = () => {
        const uid = currentUser.uid;
        return {
          uid: uid,
          name: name,
          weight: weight,
          fat: fat,
        };
      };

      if (!name || !weight) {
        console.log("not sending auth");
        Alert.alert(
          "Error",
          "Missing required fields. Please fill in all fields."
        );
      } else {
        console.log("sending auth");
        const uid = currentUser.uid;
        const profileData = createUserProfile(name, weight, fat, uid);
        await addDoc(userProfile, profileData);
        // resetForm();
        Alert.alert("Success", "User Profile data");
        // navigation.navigate("Main");
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
          keyboardType="numeric"
        />
        <LabeledTextInput
          label="Taux de graisse"
          value={fat}
          onChange={setFat}
          keyboardType="numeric"
        />
        <PickerSelect
          label="Activité sportive"
          selectedValue={activity}
          onChange={setActivity}
          items={activityValues}
        />
        {maintenance ? (
          <Text style={styles.text}>
            Vos calories de maintenance sont de : {maintenance} calories
          </Text>
        ) : (
          <Text style={styles.text}>
            Calorie de maintenance : "en attente de vos données"
          </Text>
        )}
        <View style={styles.btnWrapper}>
          <CustomButton
            style={styles.button}
            onPress={onPress}
            text="Ajouter"
          />
          <CustomButton
            style={styles.button}
            onPress={() => navigation.navigate("Goal")}
            text="Goal"
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
  text: {
    fontSize: 18,
    marginTop: 40,
  },
  // btnWrapper: {
  //   flexDirection: "column",
  //   alignItems: "flex-end",
  //   justifyContent: "space-between",
  //   paddingRight: 24,
  // },
  // button: {
  //   alignItems: "center",
  //   backgroundColor: "#E8664B",
  //   borderRadius: 10,
  //   padding: 6,
  //   marginTop: 40,
  //   width: 350,
  // },
  // btnText: {
  //   color: "white",
  //   fontSize: 20,
  // },
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
