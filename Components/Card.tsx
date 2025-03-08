import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Animated, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useFonts } from "expo-font";
import { useAppTheme } from '../App'; // Importamos el hook de tema

const CARD = ({ source, titulo, contenido, date, isExpanded }: {
    source?: string;
    titulo: string;
    contenido: string | string[];
    date?: string;
    isExpanded?: boolean;
}) => {
    // Obtenemos el tema y el modo oscuro del contexto
    const { isDarkMode, theme } = useAppTheme();
    const [expanded, setExpanded] = useState(isExpanded || false);
    const fadeAnim = useRef(new Animated.Value(expanded ? 1 : 0)).current;
    const [isLoaded] = useFonts({
        Ultra: require("../assets/fonts/OpenSans-Bold.ttf"),
    });

    // 🔹 Sincroniza `expanded` cuando `isExpanded` cambie
    useEffect(() => {
        setExpanded(isExpanded || false);
        Animated.timing(fadeAnim, {
            toValue: isExpanded ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isExpanded]);

    if (!isLoaded) return null;

    const Tocar = () => {
        setExpanded(prev => !prev);
        Animated.timing(fadeAnim, {
            toValue: expanded ? 0 : 1, // 🔹 Cambia la opacidad al abrir/cerrar
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const formatDateRange = (dateRange: string | undefined) => {
        if (!dateRange) return '';
        const dateRegex = /(\d{2})\/(\d{4})/g;
        const matches = [...dateRange.matchAll(dateRegex)];
        return matches.map(match => `01-${match[1]}-${match[2]}`).join(' → ');
    };

    return (
        <Animated.View style={styles.animatedContainer}>
            <Card
                style={[styles.card, expanded && styles.elevatedCard]}
                onPress={Tocar}
            >
                <Card.Content>
                    <View style={styles.headerContainer}>
                        <Card.Cover source={{ uri: source }} style={styles.circularImage} />
                        <Text variant="titleLarge" style={styles.title}>
                            {titulo}
                        </Text>
                    </View>
                    <Animated.View style={{ opacity: fadeAnim }}>
                        {expanded && (
                            Array.isArray(contenido) ? (
                                contenido.map((linea, index) => (
                                    <Text key={index} style={[styles.paragraph, { color: isDarkMode ? '#fff' : '#333' }]}>
                                        {linea}
                                    </Text>
                                ))
                            ) : (
                                <Text style={[styles.paragraph, { color: isDarkMode ? '#fff' : '#333' }]}>{contenido}</Text>
                            )
                        )}
                    </Animated.View>
                </Card.Content>
                {date && (
                    <View style={styles.footer}>
                        <Text style={styles.dateText}>
                            {formatDateRange(date)}
                        </Text>
                    </View>
                )}
            </Card>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    animatedContainer: {
        width: '100%',
        alignItems: 'center',
    },
    card: {
        width: '90%',
        marginVertical: 15,
        borderRadius: 25,
        alignSelf: 'center',
        elevation: 3,
        transform: [{ scale: 1 }],
    },
    elevatedCard: {
        elevation: 10,
        transform: [{ scale: 1.05 }],
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    circularImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        fontFamily: 'Ultra',
    },
    paragraph: {
        fontSize: 13,
        lineHeight: 15,
        marginTop: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        textAlign: 'left',
        writingDirection: 'ltr',
        fontFamily: 'Ultra',
    },
    footer: {
        padding: 5,
        borderTopWidth: 6,
        borderTopColor: "#ddd",
        alignItems: 'center',
    },
    dateText: {
        fontSize: 12,
        color: "#555",
        fontWeight: "bold",
    },
});

export default CARD;
