import React, { useCallback, useState } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import CARD from './Components/Card';
import AddCard from './Components/AddCard';
import Island from './Components/Island';
import FondoAzul from './Components/FondoAzul';
import { SafeAreaView } from 'react-native-safe-area-context';
import {ThemeProvider, useAppTheme} from './Components/theme-context';


export default function App() {
  const [cardsData, setCardsData] = useState([
    {
      titulo: 'Leonardo Araya',
      contenido: "Mi área profesional es la informática (desarrollo de software). Mis aptitudes van desde la ingeniería hasta la edición gráfica y creación de contenido, pasando por mi lado creativo. Como Desarrollador con más de 4 años de experiencia, he desarrollado una profunda comprensión de las tecnologías de UI y he demostrado habilidades en la creación de interfaces atractivas y fáciles de usar. He trabajado extensamente con frameworks como React, Angular, Flutter y tecnologías como HTML, CSS, JavaScript y TypeScript. También tengo experiencia en metodologías ágiles, control de versiones, consumo de APIs REST y buenas prácticas de desarrollo.",
      source: 'https://media.licdn.com/dms/image/v2/C4E03AQGY3mbtVgEkmQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1611866750459?e=1743033600&v=beta&t=BiTG2e5oTZkt6I0GWPMIn0sTNauOg6tyaGZNAtlTZVg',
      isExpanded: true,
    },
    {
      titulo: 'Correos de Chile',
      contenido: [
        "Desarrollo Front-End con React y TypeScript",
        "Consumo y depuración de APIs REST",
        "Control de versiones con GitLab",
        "Implementación de metodologías ágiles y gestión con Jira",
        "Garantía de calidad del código con SonarQube",
      ],
      source: 'https://play-lh.googleusercontent.com/ShyxSvhWEsqFSYJQ1yWZpzxOMYNAPijkwO_gGrUVRnc90RIT1MIavcc8WY1JSWOQfA=w240-h480',
      date: '01/2024 - 12/2024',
      isExpanded: false,
    },
    {
      titulo:'Dhemax Ingenieros',
      contenido: [
        "Desarrollo y mantenimiento de soluciones con React.js, TypeScript y Redux Toolkit",
        "Integración de APIs y normalización de datos",
        "Uso de herramientas como Postman y Swagger para pruebas de endpoints",
        "Control de versiones con Git y GitLab",
      ],
      source: 'https://www.developmentaid.org/files/organizationLogos/dhemax-ingenieros-spa-590907.jpg',
      date: '01/2023 - 12/2023',
      isExpanded: false,
    },
    {
      titulo: 'MITs IT/INDRA',
      contenido: [
        "Desarrollo Front-End en React con TypeScript y Material UI",
        "Automatización de tareas y flujos con Jest y Redux",
        "Consumo de APIs REST y control de estados",
        "Metodologías ágiles con Jira y Scrum",
      ],
      source: 'https://www.indraairsolutions.com/themes/custom/atm_sass/l-Logo.svg',
      date: '07/2022 - 12/2022',
      isExpanded: false,
    },
    {
      titulo: 'Fractalia Systems',
      contenido: [
        "Desarrollo Front-End en Angular 11",
        "Diseño de interfaces con HTML, CSS y Sass",
        "Control de versiones con Git y Bitbucket",
        "Metodologías ágiles: Kanban y Scrum",
      ],
      source: 'https://fractaliasystems.com/wp-content/uploads/2018/09/logo_grupo_fractalia.png',
      date: '06/2021 - 06/2022',
      isExpanded: false,
    },
    {
      titulo: 'Banco de Chile',
      contenido: [
        "Desarrollo móvil para ejecutivos con Dart y Flutter",
        "Implementación de funcionalidades en Angular 8",
        "Integración continua con Jenkins",
        "Administración de tareas con Jira",
        "Control de versiones con Bitbucket",
      ],
      source: 'https://pbs.twimg.com/profile_images/1694746966058496010/Y48o3RBX_400x400.jpg',
      date: '02/2020 - 12/2020',
      isExpanded: false,
    },
  ]);
  
  const [refreshing, setRefreshing] = useState(false);



  const AgregarCard = (newCard: any) => {
    setCardsData((prevCards) => [...prevCards, { ...newCard, key: Date.now() }]);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      //agregar metodo para actualizar
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <ThemeProvider>
      <AppContent
        cardsData={cardsData}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onAddCard={AgregarCard}
      />
    </ThemeProvider>
  );
}

const AppContent: React.FC<{
  cardsData: any[];
  refreshing: boolean;
  onRefresh: () => void;
  onAddCard: (card: any) => void;
}> = ({ cardsData, refreshing, onRefresh, onAddCard }) => {
  const { theme, isDarkMode } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);



  return (
    <SafeAreaView style={[styles.safeAreaContainer, { backgroundColor: theme.colors.background },]}>
      <View style={styles.contentContainer}>
        <FondoAzul />
        {modalVisible === true ? <AddCard
          onClose={() => setModalVisible(false)}
          visible={modalVisible}
          onAddCard={(newCard) => {
            onAddCard(newCard);
            setModalVisible(false);
          }} /> : null}
        <ScrollView contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4285F4']} />
          }>
          {cardsData.map((card, index) => (
            <CARD
              key={index}
              titulo={card.titulo}
              contenido={card.contenido}
              source={card.source}
              date={card.date}
              isExpanded={card.isExpanded === true}
            />
          ))}
        </ScrollView>
      </View>
      <Island />

      {!modalVisible && <View style={styles.fabContainer} pointerEvents="box-none">
        <TouchableOpacity
          style={[styles.fabButton]}
          onPress={() => setModalVisible(prev => !prev)}
        >
          <MaterialIcons
            name={modalVisible ? "close" : "add"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>}

      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingTop: 10,
  },
  background: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  scrollView: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingTop: 100,
  },
  cardWrapper: {
    width: '90%',
    marginBottom: 10,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 3000, 
    elevation: 12,
    pointerEvents: 'box-none',
  },

  fabButton: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#304d60',
    borderRadius: 28,
    elevation: 12, 
    zIndex: 2000, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
});
