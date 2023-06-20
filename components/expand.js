import { StyleSheet, View, Text, Dimensions, Pressable } from "react-native";
import { colors } from "../constants/data";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import * as Animatable from "react-native-animatable";

const { width, height } = Dimensions.get("screen");
const SPACING = 20;
const animation1 = {
    0: { opacity: 0, translateY: -12 },
    1: { opacity: 1, translateY: 0 }
};
const animation2 = {
    0: { opacity: 0, translateY: 12 },
    1: { opacity: 1, translateY: 0 }
}

export default function Expand({ modalData, setModal }) {
    return (
        <View style={styles.externalContainer}>
            <View style={[styles.modalContainer, { backgroundColor: colors[modalData.index], }]}>
                <Pressable
                    style={({ pressed }) => [{ position: "absolute", top: 12, left: 12 }, pressed && { opacity: 0.5 }]}
                    onPress={() => { setModal(false) }}
                >
                    <Animatable.View animation={animation1} useNativeDriver delay={400}>
                        <MaterialIcons name="cancel" size={24} color="white" />
                    </Animatable.View>
                </Pressable>
                <Text style={styles.cardText}>{modalData.text}</Text>
                <Animatable.View style={{ flexDirection: "row", position: "absolute", top: 12, right: 42 }} animation={animation1} useNativeDriver delay={400}>
                    <AntDesign name="heart" size={18} color="white" style={{ marginRight: 4 }} />
                    <Text style={styles.cardText}>{modalData.likes}</Text>
                </Animatable.View>
                <Pressable style={({ pressed }) => [{ position: "absolute", top: 11, right: 12 }, pressed && { opacity: 0.5 }]}>
                    <Animatable.View animation={animation1} useNativeDriver delay={400}>
                        <MaterialIcons name="delete" size={20} color="white" />
                    </Animatable.View>
                </Pressable>
                <Animatable.View style={styles.bottom} animation={animation2} useNativeDriver delay={400}>
                    {modalData.tags.map((item, index) => {
                        return (
                            <Text style={styles.cardText} key={index}># {item}</Text>
                        )
                    })}
                </Animatable.View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bottom: {
        position: "absolute",
        width: "100%",
        height: 40,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        bottom: 12
    },
    externalContainer: {
        height: height,
        width: width,
        backgroundColor: "#444555d5"
    },
    modalContainer: {
        paddingVertical: 100,
        width: width - 2 * SPACING,
        marginTop: 200,
        marginLeft: SPACING,
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 2
    },
    cardText: {
        fontWeight: "bold",
        color: "white",
        fontSize: 16,
        textAlign: "center"
    }
});