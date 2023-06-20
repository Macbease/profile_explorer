import React from "react";
import { StyleSheet, View, Text, Dimensions, FlatList, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from '@expo/vector-icons';
import * as Animatable from "react-native-animatable";

import { interests } from "../constants/data";

const { width, height } = Dimensions.get("screen");
const SPACING = 12;
const tile = (width - 4 * SPACING) / 3;
const animation = {
    0: { opacity: 0, translateY: -100 },
    1: { opacity: 1, translateY: 0 }
};

export default function ChooseInterest({ navigation }) {
    const [selectedTile, setSelectedTile] = React.useState([]);

    function handleSelectionEvent(tile) {
        let alreadyIncluded = selectedTile.find((item) => item === tile);
        if (alreadyIncluded) {
            setSelectedTile((prev) => prev.filter((item) => item !== tile));
        }
        else {
            setSelectedTile((prev) => [...prev, tile])
        }
    }

    function getCorrectStyle(tile) {
        let alreadyIncluded = selectedTile.find((item) => item === tile);
        if (alreadyIncluded) {
            return [{
                position: "absolute", zIndex: 10, right: 4, top: 4
            }]
        }
        else {
            return [{
                position: "absolute", zIndex: 10, right: 4, top: 4, opacity: 0
            }]
        }
    }

    function handleSubmitEvent() {
        //execute the backend function
        navigation.goBack();
    }

    return (
        <SafeAreaView>
            <View style={styles.topText}>
                <Text style={styles.label}>{selectedTile.length} selected</Text>
                <Pressable style={({ pressed }) => [styles.btn, pressed && { opacity: 0.5 }]} onPress={() => handleSubmitEvent()}>
                    <Text style={styles.btnText}>Done</Text>
                </Pressable>
            </View>
            <FlatList
                data={interests}
                keyExtractor={(_, index) => index}
                showsVerticalScrollIndicator={false}
                numColumns={3}
                renderItem={({ index, item }) => {
                    return (
                        <Animatable.View
                            style={{ display: "flex", alignItems: "center", justifyContent: 'center' }}
                            animation={animation}
                            useNativeDriver
                            delay={index * 100}
                        >
                            <Pressable style={({ pressed }) => [styles.tile, pressed && { opacity: 0.5 }]} onPress={() => { handleSelectionEvent(item.tag) }}>
                                <View style={getCorrectStyle(item.tag)}>
                                    <AntDesign name="checkcircle" size={24} color="white" />
                                </View>
                                <Image
                                    source={{ uri: item.img }}
                                    style={{ height: "100%", width: "100%", borderRadius: SPACING, resizeMode: "cover" }}
                                />
                            </Pressable>
                            <Text style={styles.tileText}>{item.tag}</Text>
                        </Animatable.View>
                    )
                }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    btnText: {
        fontWeight: "bold",
        color: "white"
    },
    btn: {
        width: 80,
        height: 26,
        borderRadius: SPACING,
        backgroundColor: "#1ea1ed",
        display: 'flex',
        alignItems: "center",
        justifyContent: "center"
    },
    tileText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: "#444"
    },
    tile: {
        // borderWidth: 0.5,
        width: tile,
        height: tile,
        borderRadius: SPACING,
        marginVertical: SPACING,
        marginLeft: SPACING

    },
    label: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#444"
    },
    topText: {
        // borderWidth: 0.5,
        width: width - 2 * SPACING,
        marginLeft: SPACING,
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        marginBottom: SPACING
    }
});