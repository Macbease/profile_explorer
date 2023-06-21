import React from "react";
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
    function getLikeStatus() {
        //fetch all the ids of the cards liked by the user
        //check if this card's id is also part of it
        //if yes then return true, otherwise return true
        return false
    }

    function handleLikeEvent() {
        //backend function to like a card
    }

    const [like, setLike] = React.useState(getLikeStatus());
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
                    <Pressable style={({ pressed }) => [{ position: "absolute", top: -2, left: -16, zIndex: 10 }, pressed && { opacity: 0.5 }]} onPress={() => { like ? setLike(false) : setLike(true); handleLikeEvent() }}>
                        {like ? <AntDesign name="like1" size={20} color="white" /> : <AntDesign name="like2" size={20} color="white" />}
                    </Pressable>
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