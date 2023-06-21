import React from "react";
import { StyleSheet, View, Animated, Dimensions, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';

const SPACING = 12;
const { width, height } = Dimensions.get("screen");
const Carousel_H = 220;
const Carousel_W = 320;


export default function Card3({ item, opacity, translateXHeading, navigation, setModalData, setModal, index }) {

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
        <Pressable style={({ pressed }) => [pressed && { opacity: 0.7 }]} onPress={() => { setModalData({ ...item, index }); setModal(true) }}>
            <View style={[styles.card, { backgroundColor: item.color }]}>
                <Pressable style={({ pressed }) => [{ position: "absolute", top: 12, left: 12, zIndex: 10 }, pressed && { opacity: 0.5 }]} onPress={() => { like ? setLike(false) : setLike(true); handleLikeEvent() }}>
                    {like ? <AntDesign name="like1" size={20} color="white" /> : <AntDesign name="like2" size={20} color="white" />}
                </Pressable>
                <Animated.Text style={[styles.buttonText, { opacity, transform: [{ translateX: translateXHeading }] }]} numberOfLines={4}>{item.text}</Animated.Text>
                <View style={styles.tag}>
                    {item.tags.map((item, index) => {
                        return (
                            <Animated.Text key={index} style={[styles.buttonText, { opacity, transform: [{ translateX: translateXHeading }] }]} ># {item}</Animated.Text>
                        )
                    })}
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    tag: {
        // borderWidth: 0.5,
        height: 30,
        width: Carousel_W,
        marginTop: SPACING,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    buttonText: {
        fontWeight: "bold",
        color: "white",
        fontSize: 14,
        textAlign: "center"
    },
    card: {
        // borderWidth: 0.5,
        height: Carousel_H,
        width: Carousel_W,
        borderRadius: SPACING,
        marginHorizontal: SPACING,
        marginTop: SPACING,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        shadowColor: "black",
        shadowRadius: 1,
        shadowOffset: { width: 0.5, height: 1 },
        shadowOpacity: 0.9,
        paddingHorizontal: 8,
    }
});