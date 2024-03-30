import { useEffect, useState } from "react";
import { auth, database } from "../firebaseConfig";
import { getDocs, collection, serverTimestamp } from "firebase/firestore";
import { SafeAreaView, Text, View, StyleSheet, ScrollView } from "react-native";
import PickerSelect from "./components/PickerSelect";

export default function Reports() {
  const authUserId = auth.currentUser.uid;

  const [reports, setReports] = useState([]);
  const profile = collection(database, "profile");
  const [monthReport, setMonthReport] = useState();
  const [yearReport, setYearReport] = useState();
  // console.log(work on it);
  // console.log(reports.map((report) => report.userId));

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getDocs(profile);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // const filteredAuthData = filteredData.filter(
        //   (AuthData) => AuthData.userId == authUserId
        // );
        // setReports(filteredAuthData);
        setReports(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReports();
  }, [profile]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>test</Text>
      <Text style={[styles.text, styles.customLastRapportText]}>test2</Text>
      <ScrollView>
        {reports.map((report) => (
          <View style={styles.lastReportContainer} key={report.id}>
            <Text style={styles.lastReportText}>{report.name}</Text>
            <Text style={styles.lastReportText}>
              Rapport du: {report.selectedDate}
            </Text>
            <Text style={styles.lastReportText}>
              Prédicateur: {report.preach ? " oui" : " non"}
            </Text>
            <Text style={styles.lastReportText}>Etude: {report.study}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    backgroundColor: "black",
    justifyContent: "space-evenly",
    marginTop: -32,
  },
  title: {
    fontSize: 24,
    color: "white",
  },
  text: {
    fontSize: 20,
    color: "white",
  },
  pickerInput: {
    fontSize: 18,
    width: 205,
    color: "pink",
    borderColor: "transparent",
    backgroundColor: "transparent",
    borderBottomColor: "#FF70BC",
    borderWidth: 1,
    marginVertical: 10,
  },
  lastReportContainer: {
    width: 205,
    borderBottomColor: "#FF70BC",
    borderWidth: 2,
    marginVertical: 10,
  },
  customLastRapportText: {
    marginVertical: 20,
    borderBottomColor: "#FF70BC",
    borderWidth: 2,
  },
  lastReportText: {
    color: "white",
    fontSize: 18,
  },
});
