import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, Dimensions } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useAppTheme } from '../App'; 

const { width } = Dimensions.get("window");

const Island = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const { isDarkMode, theme } = useAppTheme();

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const enviarCorreo = () => {
        const email = "pon tu correo aquí";
        const subject = "Sobre tu CV";
        const body = "Hola Leo, Te contacto porque...";
        const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        Linking.openURL(mailto).catch(err => console.error("No se pudo abrir el correo", err));
    };

    const islandStyle = {
        backgroundColor: isDarkMode ? theme.colors.surface : 'white',
        shadowColor: isDarkMode ? '#FFF' : '#000',
    };
    
    const textStyle = {
        color: isDarkMode ? theme.colors.onSurface : '#333',
    };
    
    const menuStyle = {
        backgroundColor: isDarkMode ? theme.colors.surface : 'white',
        shadowColor: isDarkMode ? '#FFF' : '#000',
    };

    const gitHubColor = isDarkMode ? '#FFF' : '#333';
    
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.island, islandStyle]}
                onPress={toggleMenu}
            >
                <Text style={[styles.text, textStyle]}>¡Contáctame!</Text>
                <Ionicons
                    name={menuVisible ? "chevron-up" : "chevron-down"}
                    size={20}
                    color={isDarkMode ? theme.colors.onSurface : "#555"}
                    style={styles.arrowIcon}
                />
            </TouchableOpacity>

            {/* Menú desplegable */}
            {menuVisible && (
                <View style={[styles.menu, menuStyle]}>
                    <TouchableOpacity onPress={() => Linking.openURL("https://www.linkedin.com/in/leonardo-araya-daza/")}>
                        <FontAwesome name="linkedin-square" size={30} color="#0077b5" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL("https://wa.me/+56934501580")}>
                        <FontAwesome name="whatsapp" size={30} color="#25D366" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL("https://github.com/Cronos10")}>
                        <FontAwesome name="github" size={30} color={gitHubColor} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={enviarCorreo}>
                        <FontAwesome name="envelope" size={30} color={isDarkMode ? '#64B5F6' : '#0072C6'} />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 60,
        left: "50%",
        marginLeft: -(width * 0.3),
        alignItems: "center",
    },
    island: {
        minWidth: width * 0.6,
        height: 50,
        backgroundColor: "white",
        borderRadius: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 40,
    },
    text: {
        color: "#333",
        fontWeight: "bold",
        fontSize: 16,
    },
    menu: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 15,
        gap: 15,
        marginTop: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        width: width * 0.5,
    },
    arrowIcon: {
        marginTop: 2,
    },
});

export default Island;
