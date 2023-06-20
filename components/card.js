import React from "react";
import { StyleSheet, Pressable, Animated, View, Image, Text, Dimensions } from "react-native";
import { AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get("screen");
const SPACING = 12;
const Carousel_H = 200;
const Carousel_W = 280;

export default function Card({ translateXHeading, navigation, item, opacity }) {

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
        <Pressable style={({ pressed }) => [styles.card, { backgroundColor: item.color }, pressed && { opacity: 0.7 }]} onPress={() => navigation.navigate("profile", { img: item.img, name: item.name })}>
            <Animated.View style={[styles.top, { opacity, transform: [{ translateX: translateXHeading }] }]}>
                <Pressable style={({ pressed }) => [{ position: "absolute", top: 6, left: 6, zIndex: 10 }, pressed && { opacity: 0.5 }]} onPress={() => { like ? setLike(false) : setLike(true); handleLikeEvent() }}>
                    {like ? <AntDesign name="like1" size={20} color="white" /> : <AntDesign name="like2" size={20} color="white" />}
                </Pressable>
                <View style={styles.imageBox}>
                    <Image source={{ uri: item.img }} style={styles.img} />
                </View>
                <View style={styles.interests}>
                    <Text style={[styles.buttonText, { fontSize: 12, textAlign: "center", marginTop: 8 }]} numberOfLines={5}>{item.text}</Text>
                </View>
            </Animated.View>
            <View style={styles.bottom}>
                <Pressable>
                    <Text style={styles.buttonText}>@ {item.name}</Text>
                </Pressable>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonText: {
        fontWeight: "bold",
        color: "white",
        fontSize: 12,
    },
    interests: {
        // borderWidth: 0.5,
        height: "100%",
        width: "62%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    img: {
        width: 80,
        height: 80,
        borderRadius: 50,
        resizeMode: "cover"
    },
    imageBox: {
        // borderWidth: 0.5,
        height: "100%",
        width: "38%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    bottom: {
        // borderWidth: 0.5,
        width: "100%",
        height: "20%",
        alignItems: "center"
    },
    top: {
        // borderWidth: 0.5,
        width: "100%",
        height: "80%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    card: {
        // borderWidth: 0.5,
        height: Carousel_H,
        width: 280,
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
        shadowOpacity: 0.9
    }
});