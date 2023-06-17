import { StyleSheet, Dimensions, View, Text } from "react-native";
import Image from "react-native-scalable-image";
import ProfileImage from "./profileImage";
import Autolink from "react-native-autolink";
import { colorsCommunity } from "../constants/data";
import { EvilIcons, AntDesign, MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get("screen");
const SPACING = 12;
export default function CommunityPin({ data, img }) {
    return (
        <>
            <View style={{ flexDirection: "row", marginLeft: 18 }}>
                <ProfileImage url={data.communityProfile} size={50} />
                <View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "bold", marginLeft: 12, fontSize: 20 }}>{data.communityName}</Text>
                        <MaterialIcons name="verified" size={16} color="#1ea1ed" />
                    </View>
                    <Text style={{ fontWeight: "bold", color: "#444", marginLeft: 12 }}>Posted {data.time} ago</Text>
                </View>
            </View>
            <View style={styles.card}>
                <View style={styles.profile}>
                    <ProfileImage url={img} size={50} />
                </View>
                <View style={{ width: "80%" }}>
                    <Image
                        source={{ uri: data.url }}
                        width={(width - 2 * SPACING) * 0.8}
                        borderRadius={12}
                    />
                    <Text style={styles.text}>
                        <Autolink
                            text={data.text}
                            component={Text}
                            email
                            hashtag="instagram"
                            mention="twitter"
                            phone="sms"
                            url
                        />
                    </Text>
                    <View style={styles.icon}>
                        <View style={styles.iconSub}>
                            <View style={[styles.iconWrapper, { paddingLeft: 8 }]}><EvilIcons name="comment" size={28} color={colorsCommunity.label} /></View>
                            <View style={styles.iconWrapper}><Text style={styles.textIcon}>{data.comment}</Text></View>
                        </View>
                        <View style={styles.iconSub}>
                            <View style={[styles.iconWrapper, { paddingLeft: 8 }]}><AntDesign name="like2" size={24} color={colorsCommunity.label} /></View>
                            <View style={styles.iconWrapper}><Text style={styles.textIcon}>{data.like}</Text></View>
                        </View>
                        <AntDesign name="sharealt" size={24} color={colorsCommunity.label} />
                    </View>
                </View>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    iconWrapper: {
        // borderWidth: 0.5,
        // borderColor: "red",
        width: "50%",
        height: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
    },
    textIcon: {
        // borderWidth: 0.5,
        fontWeight: "bold",
        color: colorsCommunity.label,
    },
    iconSub: {
        // borderWidth: 0.5,
        width: 80,
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    icon: {
        // borderWidth: 0.5,
        width: "100%",
        height: 34,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 6,
        paddingRight: 18
    },
    profile: {
        // borderWidth: 0.5,
        width: "20%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    text: {
        fontWeight: "bold",
        color: colorsCommunity.title,
        marginTop: 12,
        textAlign: "left",
        paddingRight: 18,
        lineHeight: 18
    },
    card: {
        // borderWidth: 0.5,
        width: width,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 12
    }
});