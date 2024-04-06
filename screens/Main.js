import React, { createContext, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
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
  const [goal, setGoal] = useState("");
  const [dried, setDried] = useState();
  const [mass, setMass] = useState();
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

  const goalChoice = [
    { label: "Quel est votre objectif ?", value: "" },
    { label: "Sèche", value: "sèche" },
    { label: "Masse", value: "masse" },
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
        setActivity("");
        setGoal("");
        setDried("");
        setMass("");
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
    <ScrollView style={styles.wrapper}>
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
        <Text style={styles.maintenanceLabel}>Calorie de maintenance</Text>
        {maintenance ? (
          <Text style={[styles.maintenanceText, { fontWeight: "bold" }]}>
            {maintenance} calories
          </Text>
        ) : (
          <Text style={styles.maintenanceText}>
            "en attente de vos données"
          </Text>
        )}
        <PickerSelect
          label="Objectif"
          selectedValue={goal}
          onChange={setGoal}
          items={goalChoice}
        />
        {goal == "" ? null : goal == "sèche" ? (
          <LabeledTextInput
            label="Quel est votre objectif sèche %"
            value={dried}
            onChange={setDried}
            keyboardType="numeric"
            customStyle={{ marginTop: 40 }}
          />
        ) : (
          <LabeledTextInput
            label="Quel est votre objectif masse %"
            value={mass}
            onChange={setMass}
            keyboardType="numeric"
            customStyle={{ marginTop: 40 }}
          />
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
    </ScrollView>
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
    fontSize: 16,
    marginTop: 40,
  },
  maintenanceLabel: {
    fontSize: 18,
    marginTop: 40,
  },
  maintenanceText: {
    fontSize: 16,
    marginTop: 12,
    width: 350,
    borderBottomWidth: 2,
    paddingBottom: 6,
    marginBottom: 40,
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
