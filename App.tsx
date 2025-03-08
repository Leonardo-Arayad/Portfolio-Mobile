import React, { useCallback, useState, createContext, useContext, useEffect } from 'react';
import { StyleSheet, View, ScrollView, useColorScheme, RefreshControl, TouchableOpacity } from 'react-native';
import { Provider, DefaultTheme, MD3DarkTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import CARD from './Components/Card';
import AddCard from './Components/AddCard';
import Island from './Components/Island';
import FondoAzul from './Components/FondoAzul';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface ThemeContextType {
  isDarkMode: boolean;
  theme: typeof DefaultTheme;
  toggleTheme?: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  theme: DefaultTheme,
});

export const useAppTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const theme = isDarkMode ? MD3DarkTheme : DefaultTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, theme }}>
      <Provider theme={theme}>
        {children}
      </Provider>
    </ThemeContext.Provider>
  );
};


export default function App() {
  const [cardsData, setCardsData] = useState([
    {
      titulo: 'Leonardo Araya',
      contenido: "Mi área profesional es la informática(desarrollo de software).Mis aptitudes van desde la ingeniería hasta la edición gráfica y creación de contenido, pasando por mi lado creativo.Como Desarrollador con más de 2 años de experiencia, he desarrollado una profunda comprensión de las tecnologías de UI y he demostrado habilidades en la creación de interfaces atractivas y fáciles de usar.Utilicé ampliamente frameworks como React y tengo un conocimiento sólido en HTML, CSS y JavaScript.También tengo una comprensión clara de la importancia del diseño y la usabilidad, y he trabajado en colaboración con equipos de diseño para asegurar una experiencia de usuario positiva.Soy capaz de resolver problemas de manera eficiente y estoy constantemente buscando nuevas formas de mejorar mis habilidades y aprender nuevas tecnologías.",
      source: 'https://media.licdn.com/dms/image/v2/C4E03AQGY3mbtVgEkmQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1611866750459?e=1743033600&v=beta&t=BiTG2e5oTZkt6I0GWPMIn0sTNauOg6tyaGZNAtlTZVg',
      isExpanded: true,
    },
    {
      titulo: 'Banco de Chile',
      contenido: [
        "Implementation of new features with Angular 8",
        "Mobile app development for executives using Dart and Flutter",
        "Code versioning with Git and Bitbucket",
        "Task administration with Jira",
        "Execution of Scrum methodology",
        "Use of Jenkins for CI/CD",
      ],
      source: 'https://pbs.twimg.com/profile_images/1694746966058496010/Y48o3RBX_400x400.jpg',
      date: '02/2020 - 12/2020',
      isExpanded: false,
    },
    {
      titulo: 'Correos de Chile',
      contenido: [
        "Development of modern web applications using React and TypeScript.",
        "Code version control using GitLab",
        "Consumption and debugging of REST APIs",
        "Implementation of agile methodologies and task management with Jira",
        "Code quality assurance with SonarQube.",
      ],
      source: 'https://play-lh.googleusercontent.com/ShyxSvhWEsqFSYJQ1yWZpzxOMYNAPijkwO_gGrUVRnc90RIT1MIavcc8WY1JSWOQfA=w240-h480',
      date: '02/2020 - 12/2020',
      isExpanded: false,
    },
  ])
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
