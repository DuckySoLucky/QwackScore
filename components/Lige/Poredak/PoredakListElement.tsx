import { StyleSheet, Image } from "react-native";
import { Text, View } from "@/components/Themed";

export default function GamesList({ data, last, type }) {
  return (
    <View style={{ ...styles.row, ...(last === true ? { borderColor: "transparent" } : {}) }}>
      <Text style={styles.positionRow}>{data.position}</Text>
      <Image
        source={{
          uri: data.image,
        }}
        style={styles.clubLogo}
        resizeMode="contain"
      />

      {type === "default" ? (
        <>
          <Text style={styles.teamNameRow}>{data.name}</Text>
          <Text style={styles.PRow}>{data.played}</Text>
          <Text style={styles.GDRow}>{data.goals_diff}</Text>
          <Text style={styles.PTSRow}>{data.points}</Text>
        </>
      ) : (
        <>
          <Text style={styles.teamNameRow}>{data.name}</Text>

          <View style={styles.formScore}>
            {data.form.split("").map((str, index) => {
              return (
                <View
                  style={{
                    ...styles.formElement,
                    backgroundColor: str === "W" ? "#21E08C" : str === "D" ? "#D9D9D9" : "#D82458",
                  }}
                  key={index}
                >
                  <Text style={styles.formText}>{str}</Text>
                </View>
              );
            })}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "#10181E",
    paddingBottom: 12,
    paddingRight: 6,
    paddingLeft: 6,
    width: "100%",
    height: "100%",
  },
  container: {
    marginTop: 6,
    backgroundColor: "#10181E",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    paddingRight: 6,
    height: "auto",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    backgroundColor: "transparent",
  },
  positionRow: {
    color: "#686868",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 13,
  },
  teamNameRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#686868",
    fontSize: 16,
    position: "absolute",
    left: 75,
  },
  PRow: {
    color: "#686868",
    fontWeight: "bold",
    fontSize: 16,
    position: "absolute",
    right: 120,
  },
  GDRow: {
    color: "#686868",
    fontWeight: "bold",
    fontSize: 16,
    position: "absolute",
    right: 73,
  },
  PTSRow: {
    color: "#686868",
    fontWeight: "bold",
    fontSize: 16,
    position: "absolute",
    right: 20,
  },
  clubLogo: {
    height: 18,
    width: 18,
    position: "absolute",
    left: 50,
  },
  formElement: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginRight: 4,
  },
  formText: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 14,
  },
  formScore: {
    flexDirection: "row",
    position: "absolute",
    backgroundColor: "transparent",
    right: 10,
  },
});
