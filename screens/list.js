import React from "react";
import { StyleSheet, View, Text, Dimensions, TextInput, Pressable, ScrollView, FlatList, Image, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, Foundation, FontAwesome5 } from '@expo/vector-icons';
import { data, data1, person, data2 } from "../constants/data";

const { width, height } = Dimensions.get("screen");
const SPACING = 12;
const Carousel_H = 200;
const Carousel_W = 280;

export default function List({ navigation }) {
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const scrollX1 = React.useRef(new Animated.Value(0)).current;
    return (
        <SafeAreaView>
            <View style={styles.searchBox}>
                <TextInput
                    placeholder="Search prompt..."
                    style={styles.textInput}
                />
                <Pressable style={({ pressed }) => [styles.searchButton, pressed && { opacity: 0.7 }]}>
                    <FontAwesome name="search" size={22} color="#444" />
                </Pressable>
            </View>
            <ScrollView style={{ marginTop: SPACING, marginBottom: 4 * SPACING }}>
                <View style={styles.promptBox}>
                    <Pressable style={({ pressed }) => [styles.prompt, { width: "25%" }, pressed && { opacity: 0.7 }]}>
                        <Text style={styles.buttonText}>Your cards</Text>
                    </Pressable>
                    <Pressable style={({ pressed }) => [styles.prompt, { width: "38%" }, pressed && { opacity: 0.7 }]}>
                        <Text style={styles.buttonText}>Generate ideas</Text>
                        <Foundation name="lightbulb" size={20} color="white" style={{ marginLeft: 6, marginBottom: 4 }} />
                    </Pressable>
                    <Pressable style={({ pressed }) => [styles.prompt, { width: "30%" }, pressed && { opacity: 0.7 }]}>
                        <Text style={styles.buttonText}>Explore</Text>
                        <FontAwesome5 name="wpexplorer" size={20} color="white" style={{ marginLeft: 6 }} />
                    </Pressable>
                </View>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Based on your interest...</Text>
                </View>
                <Animated.FlatList
                    data={data}
                    keyExtractor={({ index, _ }) => index}
                    horizontal
                    snapToInterval={Carousel_W + 2 * SPACING}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: true }
                    )}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
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
                            <Pressable style={({ pressed }) => [styles.card, { backgroundColor: item.color }, pressed && { opacity: 0.7 }]} onPress={() => navigation.navigate("profile", { img: item.img, name: item.name })}>
                                <Animated.View style={[styles.top, { opacity, transform: [{ translateX: translateXHeading }] }]}>
                                    <View style={styles.imageBox}>
                                        <Image source={{ uri: item.img }} style={styles.img} />
                                    </View>
                                    <View style={styles.interests}>
                                        {item.interest.map((item, index) => {
                                            return (
                                                <Text style={[styles.buttonText, { fontSize: 12, textAlign: "center", marginTop: 8 }]} key={index}># {item}</Text>
                                            )
                                        })}
                                    </View>
                                </Animated.View>
                                <View style={styles.bottom}>
                                    <Pressable>
                                        <Text style={styles.buttonText}>@ {item.name}</Text>
                                    </Pressable>
                                </View>
                            </Pressable>
                        )
                    }}
                />
                <View style={styles.title}>
                    <Text style={styles.titleText}>Recommendation of the day</Text>
                </View>
                <View style={styles.person}>
                    <View style={styles.personImg}>
                        <Image
                            source={{ uri: person.img }}
                            style={{ width: "90%", height: 150, resizeMode: "cover", borderRadius: SPACING }}
                        />
                        <Text style={styles.name}>{person.name}</Text>
                    </View>
                    <View style={styles.personTag}>
                        <Text style={styles.tagText}>" {person.tag} "</Text>
                        <Pressable style={({ pressed }) => [styles.prompt, { height: 30, width: 120, marginTop: SPACING }, pressed && { opacity: 0.7 }]}>
                            <Text style={styles.buttonText}>Find more</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.title}>
                    <Text style={styles.titleText}>We find them related to you...</Text>
                </View>
                <FlatList
                    data={data2}
                    keyExtractor={(_, index) => index}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <Pressable style={({ pressed }) => [styles.circularImg, pressed && { opacity: 0.7 }]}>
                                <Image
                                    source={{ uri: item.img }}
                                    style={{ width: "100%", height: "100%", borderRadius: 50, resizeMode: "cover" }}
                                />
                            </Pressable>
                        )
                    }}
                />
                <View style={styles.title}>
                    <Text style={styles.titleText}>Handpicked for you...</Text>
                </View>
                <Animated.FlatList
                    data={data1}
                    keyExtractor={({ index, _ }) => index}
                    horizontal
                    snapToInterval={Carousel_W + 2 * SPACING}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX1 } } }],
                        { useNativeDriver: true }
                    )}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        const inputRange = [(index - 1) * (Carousel_W + 20), index * (Carousel_W + 20), (index + 1) * (Carousel_W + 20)];
                        const translateXHeading = scrollX1.interpolate({
                            inputRange,
                            outputRange: [width * 0.1, 0, -width * 0.1],
                        });
                        const opacity = scrollX1.interpolate({
                            inputRange: inputRange,
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: "clamp"
                        });
                        return (
                            <View style={[styles.card, { backgroundColor: item.color }]}>
                                <Animated.View style={[styles.top, { opacity, transform: [{ translateX: translateXHeading }] }]}>
                                    <View style={styles.imageBox}>
                                        <Image source={{ uri: item.img }} style={styles.img} />
                                    </View>
                                    <View style={styles.interests}>
                                        {item.interest.map((item, index) => {
                                            return (
                                                <Text style={[styles.buttonText, { fontSize: 12, textAlign: "center", marginTop: 8 }]} key={index}># {item}</Text>
                                            )
                                        })}
                                    </View>
                                </Animated.View>
                                <View style={styles.bottom}>
                                    <Pressable>
                                        <Text style={styles.buttonText}>@ {item.name}</Text>
                                    </Pressable>
                                </View>
                            </View>
                        )
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    circularImg: {
        // borderWidth: 0.5,
        width: 100,
        height: 100,
        borderRadius: 50,
        marginLeft: SPACING,
        marginTop: 2 * SPACING,
        marginBottom: SPACING
    },
    tagText: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16
    },
    name: {
        marginTop: 6,
        fontWeight: "bold",

    },
    personTag: {
        height: "100%",
        width: "60%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    personImg: {
        height: "100%",
        width: "40%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    person: {
        borderWidth: 0.5,
        borderColor: "#09090981",
        width: width - 2 * SPACING,
        marginLeft: SPACING,
        height: Carousel_H,
        borderRadius: SPACING,
        marginTop: SPACING,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    titleText: {
        fontWeight: "bold",
        fontSize: 24,
        marginLeft: SPACING,
        color: "#444"
    },
    title: {
        // borderWidth: 0.5,
        marginTop: SPACING
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
    bottom: {
        // borderWidth: 0.5,
        width: "100%",
        height: "20%",
        alignItems: "center"
    },
    img: {
        width: 80,
        height: 80,
        borderRadius: 50,
        resizeMode: "cover"
    },
    interests: {
        // borderWidth: 0.5,
        height: "100%",
        width: "62%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    imageBox: {
        // borderWidth: 0.5,
        height: "100%",
        width: "38%",
        display: "flex",
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
    },
    buttonText: {
        fontWeight: "bold",
        color: "white",
        fontSize: 14
    },
    prompt: {
        height: "100%",
        borderRadius: 2 * SPACING,
        backgroundColor: "#1ea1ed",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    promptBox: {
        // borderWidth: 0.5,
        width: width - 2 * SPACING,
        marginLeft: SPACING,
        height: 36,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between'
    },
    searchButton: {
        width: "10%",
        height: "100%",
        borderRadius: SPACING,
        display: "flex",
        alignItems: "center",
        justifyContent: 'center'
    },
    textInput: {
        width: "90%",
        height: "100%",
        borderRadius: SPACING,
        paddingLeft: SPACING
    },
    searchBox: {
        borderWidth: 0.5,
        borderColor: "#09090981",
        width: width - 2 * SPACING,
        marginLeft: SPACING,
        height: 40,
        borderRadius: SPACING,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center'
    }
});


