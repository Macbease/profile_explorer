import { StyleSheet, View, Text, FlatList, Dimensions, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { prompts } from "../constants/data";
import * as Animatable from "react-native-animatable";

const { width, height } = Dimensions.get("screen");
const SPACING = 12;
const animation = {
    0: { opacity: 0, translateX: -200 },
    1: { opacity: 1, translateX: 0 }
}

export default function Prompts() {
    return (
        <SafeAreaView>
            <View style={styles.title}>
                <Text style={styles.message}>The message</Text>
                <Text style={styles.heading}>College is all about meeting right person,
                    one who will go with you all the way. We at Macbease help you find that person.
                    Our ai model maps your search keyword to most relevant cards published so that you can have the right person.
                </Text>
                <Text style={styles.subText}>@ Macbease </Text>
                <Text style={[styles.heading, { marginTop: SPACING, marginBottom: 2 * SPACING }]}>
                    Here are the prompts you wanna search...
                </Text>
            </View>
            <FlatList
                data={prompts}
                keyExtractor={(index, _) => index}
                contentContainerStyle={{ width: width - 2 * SPACING, marginLeft: SPACING, display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: 300 }}
                numColumns={2}
                renderItem={({ item, index }) => {
                    return (
                        <Animatable.View animation={animation} useNativeDriver delay={600}>
                            <Pressable style={[styles.card]}>
                                <Text style={styles.cardText}>{item}</Text>
                            </Pressable>
                        </Animatable.View>
                    )
                }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    cardText: {
        fontWeight: "bold",
    },
    card: {
        marginLeft: SPACING,
        borderWidth: 0.5,
        borderColor: "#58585ea0",
        height: 30,
        borderRadius: SPACING,
        marginHorizontal: SPACING,
        marginVertical: SPACING,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: SPACING
    },
    subText: {
        marginLeft: width / 1.8,
        fontWeight: "bold",
        marginTop: SPACING,
        color: "#444555d5"
    },
    message: {
        fontWeight: "bold",
        paddingHorizontal: 12,
        color: "#f3486aea",
        fontSize: 22
    },
    title: {
        width: width - 2 * SPACING,
        marginLeft: SPACING,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    heading: {
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
        paddingHorizontal: 12
    }
});