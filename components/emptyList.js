import { StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";

export default function EmptyList({ text }) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <LottieView source={require("../assets/51382-astronaut-light-theme.json")} autoPlay loop style={[{ width: 260, height: 260 }]} />
            <Text style={styles.txt}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    txt: {
        fontWeight: "bold",
        fontSize: 16
    }
});