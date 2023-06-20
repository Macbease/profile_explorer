import React from "react";
import { StyleSheet, View, Text, Dimensions, ScrollView, Image, Pressable, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { search } from "../constants/data";
import LottieView from "lottie-react-native";
import * as Animatable from "react-native-animatable";
import Card2 from "../components/card2";

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

export default function Search({ route, navigation }) {
    const { prompt } = route.params;
    const [loading, setLoading] = React.useState(true);
    const [result, setResult] = React.useState(null);
    const scrollY = React.useRef(new Animated.Value(0)).current;

    function fetchSearchResult() {
        if (prompt === "React") {
            setTimeout(() => {
                setResult([]);
                setLoading(false);
            }, 2000)
        }
        else {
            setTimeout(() => {
                setResult(search);
                setLoading(false);
            }, 2000)
        }
    }

    React.useEffect(() => {
        fetchSearchResult();
    }, [])

    function getCorrectContent() {
        if (loading) {
            return (
                <View style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: width * 0.3 }}>
                    <LottieView source={require("../assets/141572-space-boy-developer.json")} autoPlay loop style={[{ width: 260, height: 260 }]} />
                    <Text style={styles.searching}>Hold on while we are looking for the right person...</Text>
                    <Text style={styles.subSearching}>Searching prompt: @{prompt}</Text>
                </View>
            )
        }
        else {
            if (result.length !== 0) {
                return (
                    <SafeAreaView>
                        <Text style={styles.title}>{result.length} results found...</Text>
                        <Animated.ScrollView
                            contentContainerStyle={styles.scrollView}
                            showsVerticalScrollIndicator={false}
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                                { useNativeDriver: true }
                            )}
                        >
                            {result.map((item, index) => {
                                const inputRange = [(index - 1) * (Carousel_H + 42), index * (Carousel_H + 42), (index + 1) * (Carousel_H + 42)];
                                const opacity = scrollY.interpolate({
                                    inputRange: inputRange,
                                    outputRange: [1, 1, 0]
                                });
                                return (
                                    <Card2 item={item} opacity={opacity} navigation={navigation} index={index} key={index} />
                                )
                            })}
                        </Animated.ScrollView>
                    </SafeAreaView>
                )
            }
            else {
                return (
                    <View style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: width * 0.3 }}>
                        <LottieView source={require("../assets/141572-space-boy-developer.json")} autoPlay loop style={[{ width: 260, height: 260 }]} />
                        <Text style={styles.searching}>Sorry could not find anything of match.</Text>
                        <Text style={styles.subSearching}>Try another prompt: @{prompt}</Text>
                    </View>
                )
            }
        }

    }


    return (
        <>
            {getCorrectContent()}
        </>
    )
}

const styles = StyleSheet.create({
    name: {
        position: "absolute",
        fontWeight: "bold",
        color: "white",
        fontSize: 16,
        bottom: SPACING / 2,
        left: 85
    },
    img: {
        position: "absolute",
        resizeMode: "cover",
        height: 70,
        width: 70,
        borderRadius: 35,
        bottom: 0,
        left: SPACING
    },
    overLayContainer: {
        // borderWidth: 0.5,
        height: Carousel_H + 30,
        marginTop: SPACING,
    },
    cardText: {
        fontWeight: "bold",
        color: "white",
        fontSize: 16,
        textAlign: "center",
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
    title: {
        fontWeight: "bold",
        fontSize: 24,
        marginLeft: SPACING,
        marginBottom: SPACING,
        color: "#444"
    },
    scrollView: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    subSearching: {
        fontWeight: "bold",
        marginTop: 6,
        color: "#68686bcf"
    },
    searching: {
        fontWeight: "bold",
        fontSize: 16
    }
});


