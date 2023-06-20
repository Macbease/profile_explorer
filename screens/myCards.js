import React from "react";
import { StyleSheet, View, Text, Image, Dimensions, ScrollView, Animated, FlatList, TextInput, Pressable, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { myCards, colors } from "../constants/data";
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import Expand from "../components/expand";
import * as Animatable from "react-native-animatable";

const { width, height } = Dimensions.get("screen");
const SPACING = 12;
const Carousel_H = 250;
const Carousel_W = 300;

const animation1 = {
    0: { opacity: 0, translateY: -80 },
    1: { opacity: 1, translateY: 0 }
};

const animation2 = {
    0: { opacity: 0 },
    1: { opacity: 1 }
};

export default function MyCard({ navigation }) {
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const [modal, setModal] = React.useState(false);
    const [modalData, setModalData] = React.useState(null);
    return (
        <SafeAreaView>
            <Modal visible={modal} transparent={true} animationType="slide" style={{ position: "absolute" }}>
                <Expand modalData={modalData} setModal={setModal} />
            </Modal>
            <Animatable.View
                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                animation={animation1}
                useNativeDriver
                delay={400}
            >
                <Image
                    source={{ uri: myCards.profile }}
                    style={styles.img}
                />
                <Text style={styles.hello}>Hello! {myCards.name}</Text>
                <Pressable style={({ pressed }) => [styles.savedCards, pressed && { opacity: 0.7 }]} onPress={() => navigation.navigate("savedCards")}><Text style={[styles.cardText, { fontSize: 12 }]}>Saved Cards</Text></Pressable>
            </Animatable.View>
            <View style={styles.divider}></View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ marginBottom: 4 * SPACING }}
            >
                <Animatable.View animation={animation2} useNativeDriver delay={500}>
                    <View>
                        <Text style={[styles.hello, { color: "#444", marginLeft: SPACING }]}>Your chosen area of interest are</Text>
                        <Pressable style={({ pressed }) => [pressed && { opacity: 0.5 }, { position: "absolute", right: 12, top: 6 }]} onPress={() => { navigation.navigate("chooseInterest") }}>
                            <Feather name="edit" size={24} color="black" />
                        </Pressable>
                    </View>
                    {myCards.interest.map((item, index) => {
                        return (
                            <View style={[styles.interestCard, { backgroundColor: colors[index] }]} key={index}>
                                <Text style={[styles.interestText]}>{item}</Text>
                            </View>
                        )
                    })}

                    <Text style={[styles.hello, { color: "#444", marginLeft: SPACING, marginTop: SPACING }]}>Your cards are</Text>
                    <Animated.FlatList
                        data={myCards.cards}
                        keyExtractor={(_, index) => index}
                        horizontal
                        snapToInterval={Carousel_W + 2 * SPACING}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: true }
                        )}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ index, item }) => {
                            const inputRange = [(index - 1) * (Carousel_W + 20), index * (Carousel_W + 20), (index + 1) * (Carousel_W + 20)];
                            const translateXHeading = scrollX.interpolate({
                                inputRange,
                                outputRange: [width * 0.1, 0, -width * 0.1],
                            });
                            const opacity = scrollX.interpolate({
                                inputRange: inputRange,
                                outputRange: [0.3, 1, 0.3],
                                extrapolate: "clamp"
                            });
                            return (
                                <Pressable style={({ pressed }) => [styles.card, { backgroundColor: colors[index] }, pressed && { opacity: 0.7 }]} onPress={() => { setModalData({ ...item, index }); setModal(true) }}>
                                    <Animated.View style={[styles.top, { opacity, transform: [{ translateX: translateXHeading }] }]}>
                                        <View style={{ position: "absolute", flexDirection: "row", justifyContent: "space-between", width: "100%", top: SPACING }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <AntDesign name="heart" size={14} color="white" style={{ marginTop: 3, marginRight: 4 }} />
                                                <Text style={styles.cardText}>{item.likes}</Text>
                                            </View>
                                            <MaterialIcons name="delete" size={18} color="white" />
                                        </View>

                                        <Text style={styles.cardText} numberOfLines={4}>{item.text}</Text>
                                    </Animated.View>
                                    <View style={styles.bottom}>
                                        {item.tags.map((item, index) => {
                                            return (
                                                <Text style={styles.cardText} key={index}># {item}</Text>
                                            )
                                        })}
                                    </View>
                                </Pressable>
                            )
                        }}
                    />
                    <Text style={[styles.hello, { color: "#444", marginLeft: SPACING, marginTop: SPACING }]}>Still got {10 - myCards.cards.length} cards left. Let's compose</Text>
                    <TextInput
                        style={styles.input}
                        multiline={true}
                        placeholder="Enter the text here..."
                        maxLength={180}
                    />
                    <TextInput
                        style={styles.tagInput}
                        placeholder="Enter tag 1"
                    />
                    <TextInput
                        style={styles.tagInput}
                        placeholder="Enter tag 2"
                    />
                    <TextInput
                        style={styles.tagInput}
                        placeholder="Enter tag 3"
                    />
                    <Pressable style={styles.createBtn}>
                        <View style={styles.btn}>
                            <Text style={styles.cardText}>Create</Text>
                        </View>
                    </Pressable>
                </Animatable.View>
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    savedCards: {
        position: "absolute",
        bottom: 0,
        right: 24,
        height: 26,
        width: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        backgroundColor: "#1ea1ed"
    },
    btn: {
        paddingHorizontal: 2 * SPACING,
        backgroundColor: "#1ea1ed",
        paddingVertical: 4,
        borderRadius: SPACING
    },
    createBtn: {
        // borderWidth: 0.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 30,
        marginTop: SPACING
    },
    tagInput: {
        borderWidth: 0.5,
        borderColor: "#636365a9",
        width: width - 2 * SPACING,
        marginLeft: SPACING,
        marginTop: SPACING,
        borderRadius: SPACING,
        height: 40,
        padding: SPACING,
    },
    input: {
        borderWidth: 0.5,
        borderColor: "#636365a9",
        width: width - 2 * SPACING,
        marginLeft: SPACING,
        marginTop: SPACING,
        borderRadius: SPACING,
        height: 180,
        padding: SPACING,
    },
    cardText: {
        fontWeight: "bold",
        color: "white",
        fontSize: 16,
        textAlign: "center"
    },
    bottom: {
        // borderWidth: 0.5,
        width: "100%",
        height: "20%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    top: {
        // borderWidth: 0.5,
        width: "100%",
        height: "80%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: SPACING
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
        shadowOpacity: 0.9
    },
    interestText: {
        fontWeight: "bold",
        color: "white"
    },
    interestCard: {
        paddingHorizontal: SPACING,
        height: 30,
        width: 180,
        marginLeft: SPACING,
        borderRadius: SPACING,
        height: 30,
        display: "flex",
        alignItems: "flex-start",
        marginTop: SPACING,
        justifyContent: "center"
    },
    interest: {
        borderWidth: 0.5,
        marginTop: SPACING
    },
    divider: {
        borderWidth: 0.5,
        width: width - 2 * SPACING,
        marginLeft: SPACING,
        marginTop: SPACING
    },
    hello: {
        fontWeight: "bold",
        fontSize: 20,
        marginTop: SPACING / 2
    },
    img: {
        height: 80,
        width: 80,
        borderRadius: 40,
        marginTop: SPACING / 2
    }
});