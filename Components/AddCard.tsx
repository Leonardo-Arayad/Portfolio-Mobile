import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Modal, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useAppTheme } from '../Components/theme-context'; 
import { BlurView } from 'expo-blur';

const AddCard = ({ visible, onClose, onAddCard }: { visible: boolean; onClose: () => void; onAddCard: (newCard: any) => void }) => {
    const { theme, isDarkMode } = useAppTheme();
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const [imagen, setImagen] = useState('');
    const [date, setDate] = useState('');

    const handleAddCard = () => {
        if (!titulo.trim() || !contenido.trim()) return;
        const dateRegex = /^(\d{2}\/\d{4})-(\d{2}\/\d{4})$/;
        if (!dateRegex.test(date)) {
            alert("Por favor ingresa la fecha en formato MM/YYYY - MM/YYYY");
            return;
        }

        const newCard = {
            titulo,
            contenido,
            source: imagen,
            date,
            isExpanded: true,
        };

        onAddCard(newCard);
        setTitulo('');
        setContenido('');
        setDate('');
        setImagen('');
        onClose();
    };

    const containerStyle = {
        backgroundColor: isDarkMode ? theme.colors.surface : '#FFF',
        borderColor: isDarkMode ? theme.colors.outline : '#CCC',
    };

    const inputStyle = {
        backgroundColor: isDarkMode ? theme.colors.background : '#FFF',
        color: isDarkMode ? '#FFF' : '#000',
        borderColor: isDarkMode ? 'white' : '#CCC',
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.modalBackground}>
                    <BlurView intensity={90} tint="dark" style={styles.blurEffect}>
                        <View style={[styles.container, containerStyle]}>
                            <TextInput
                                style={[styles.input, inputStyle]}
                                placeholder="Título"
                                placeholderTextColor={isDarkMode ? '#AAA' : '#555'}
                                value={titulo}
                                onChangeText={setTitulo}
                            />
                            <TextInput
                                style={[styles.input, inputStyle]}
                                placeholder="Fecha (MM/YYYY - MM/YYYY)"
                                placeholderTextColor={isDarkMode ? '#AAA' : '#555'}
                                value={date}
                                onChangeText={(text) => {
                                    const formattedText = text.replace(/[^0-9/-]/g, '');
                                    setDate(formattedText.toString().slice(0, 17));
                                }}
                            />
                            <TextInput
                                style={[styles.input, styles.textArea, inputStyle]}
                                placeholder="Contenido"
                                placeholderTextColor={isDarkMode ? '#AAA' : '#555'}
                                value={contenido}
                                onChangeText={setContenido}
                                multiline
                            />
                            <TextInput
                                style={[styles.input, inputStyle]}
                                placeholder="URL de Imagen (opcional)"
                                placeholderTextColor={isDarkMode ? '#AAA' : '#555'}
                                value={imagen}
                                onChangeText={setImagen}
                            />
                            <TouchableOpacity style={styles.button} onPress={handleAddCard}>
                                <Text style={styles.buttonText}>Agregar Tarjeta</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                                <Text style={styles.closeButtonText}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </BlurView>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 1500, 
    },
    blurEffect: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    container: {
        width: '90%',
        marginTop:'60%',
        alignSelf: 'center',
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        elevation: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    textArea: {
        height: 60,
        textAlignVertical: 'top',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#304d60',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        alignSelf: 'center',
    },
    closeButtonText: {
        color: '#6d7a83',
        fontWeight: 'bold',
    },
});

export default AddCard;
