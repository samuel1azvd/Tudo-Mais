import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Importação de ícones (Certifique-se de que a biblioteca está instalada)
import Ionicons from 'react-native-vector-icons/Ionicons';

// Importação das telas usando os nomes originais dos seus arquivos
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import HomeScreen from './HomeScreen';
import MenuScreen from './MenuScreen';
import CheckoutScreen from './CheckoutScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/**
 * Navegação por Abas (Parte interna após o Login)
 */
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Início') {
            iconName = 'home-outline';
          } else if (route.name === 'Produtos') {
            iconName = 'water-outline'; // Ícone que remete a limpeza
          } else if (route.name === 'Carrinho') {
            iconName = 'cart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007BFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Início" 
        component={HomeScreen} 
        options={{ title: 'TudoMais+ Home' }}
      />
      <Tab.Screen 
        name="Produtos" 
        component={MenuScreen} // Usando seu arquivo MenuScreen.js
        options={{ title: 'Produtos de Limpeza' }}
      />
      <Tab.Screen 
        name="Carrinho" 
        component={CheckoutScreen} // Usando seu arquivo CheckoutScreen.js
        options={{ title: 'Finalizar Compra' }}
      />
    </Tab.Navigator>
  );
}

/**
 * Navegador Principal (Stack)
 */
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        {/* Telas de Autenticação */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={RegisterScreen} />

        {/* Tela Principal (Abas) */}
        <Stack.Screen 
          name="Main" 
          component={MainTabs} 
          options={{ gestureEnabled: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
