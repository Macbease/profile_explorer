import React from "react";
import { View, Animated, Pressable, Text, StyleSheet, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";
import { AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get("screen");
const SPACING = 12;
const Carousel_H = 220;
const Carousel_W = 280;

const animation = {
    0: { opacity: 0, translateX: -200 },
    1: { opacity: 1, translateX: 0 }
};

const animation2 = {
    0: { scale: 0 },
    1: { scale: 1 }
};

const animation3 = {
    0: { opacity: 0 },
    1: { opacity: 1 }
}

export default function Card2({ item, opacity, navigation, index, liked }) {

    function getLikeStatus() {
        //fetch all the ids of the cards liked by the user
        //check if this card's id is also part of it
        //if yes then return true, otherwise return true

        //this liked prop is temporary and is used to ensure that when this card is rendered in savedCards component
        //then the like button is true and when this card is rendered at any place else then like button is false
        //but when integrating this data will come from backend so we don't need this. So delete this prop from here and from the SavedCards component
        if (liked) return true
        else return false
    }

    function handleLikeEvent() {
        //backend function to like a card
    }

    const [like, setLike] = React.useState(getLikeStatus());

    return (
        <Animated.View style={{ opacity }}>
            <Pressable style={({ pressed }) => [{ position: "absolute", top: 24, left: 12, zIndex: 10 }, pressed && { opacity: 0.5 }]} onPress={() => { like ? setLike(false) : setLike(true); handleLikeEvent() }}>
                {like ? <AntDesign name="like1" size={20} color="white" /> : <AntDesign name="like2" size={20} color="white" />}
            </Pressable>
            <Pressable style={({ pressed }) => [styles.overLayContainer, pressed && { opacity: 0.7 }]} onPress={() => { navigation.navigate("profile", { img: item.img, name: item.name }) }}>
                <View style={[styles.card, { backgroundColor: item.color }]}>
                    <Animatable.View animation={animation} useNativeDriver delay={600}>
                        <Text style={styles.cardText} numberOfLines={3} >{item.tag}</Text>
                    </Animatable.View>
                    <Animatable.Text style={styles.name} animation={animation3} useNativeDriver delay={600}>@ {item.name}   {Math.ceil(index * 4 / Math.random())} likes</Animatable.Text>
                </View>
                <Animatable.Image source={{ uri: item.img }} style={styles.img} animation={animation2} useNativeDriver delay={600} />
            </Pressable>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    img: {
        position: "absolute",
        resizeMode: "cover",
        height: 70,
        width: 70,
        borderRadius: 35,
        bottom: 0,
        left: SPACING
    },
    name: {
        position: "absolute",
        fontWeight: "bold",
        color: "white",
        fontSize: 16,
        bottom: SPACING / 2,
        left: 85
    },
    overLayContainer: {
        // borderWidth: 0.5,
        height: Carousel_H + 30,
        marginTop: SPACING,
    },
    card: {
        // borderWidth: 0.5,
        height: Carousel_H,
        width: width - 2 * SPACING,
        borderRadius: SPACING,
        paddingHorizontal: 2 * SPACING,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "black",
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: { width: 1, height: 0.5 }
    },
    cardText: {
        fontWeight: "bold",
        color: "white",
        fontSize: 16,
        textAlign: "center",
    },
});