import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Assumindo que já está instalado

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async () => {
    setErro(''); // Limpa o erro anterior

    if (email === '' || password === '') {
      setErro('Digite e-mail e senha!');
      return;
    }

    try {
      const userData = await AsyncStorage.getItem('userAccount');
      
      if (userData !== null) {
        const { savedEmail, savedPassword } = JSON.parse(userData);

        if (email === savedEmail && password === savedPassword) {
          navigation.replace('Main');
        } else {
          setErro('E-mail ou senha incorretos!');
        }
      } else {
        setErro('Nenhum usuário cadastrado neste dispositivo.');
      }
    } catch (e) {
      setErro('Erro ao acessar a memória do celular.');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Logo da Empresa */}
        <Image 
          source={require('./assets/logo-tudomais.png')} // Certifique-se de que o caminho e nome da imagem estejam corretos
          style={styles.logo} 
          resizeMode="contain"
        />

        <Text style={styles.pageTitle}>ENTRAR</Text>

        {/* Exibição do Erro */}
        {erro !== '' && <Text style={styles.errorText}>{erro}</Text>}

        {/* Input de E-mail com Ícone */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#fff" style={styles.icon} />
          <TextInput 
            style={styles.input} 
            placeholder="E-mail" 
            placeholderTextColor="#A0AAB5"
            value={email} 
            onChangeText={(t) => { setEmail(t); setErro(''); }} 
            autoCapitalize="none" 
            keyboardType="email-address"
          />
        </View>

        {/* Input de Senha com Ícone */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#fff" style={styles.icon} />
          <TextInput 
            style={styles.input} 
            placeholder="Senha" 
            placeholderTextColor="#A0AAB5"
            value={password} 
            onChangeText={(t) => { setPassword(t); setErro(''); }} 
            secureTextEntry 
          />
        </View>

        {/* Botão Principal */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>

        {/* Links Inferiores */}
        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={styles.linkButton}>
          <Text style={styles.linkText}>Não tem conta? <Text style={styles.linkTextBold}>Cadastre-se</Text></Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0A1E3F', // Azul marinho da identidade
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  logo: {
    width: '100%',
    height: 200,
    marginBottom: 30,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 25,
    letterSpacing: 1,
  },
  errorText: { 
    color: '#FF4D4D', 
    textAlign: 'center', 
    marginBottom: 15, 
    fontWeight: 'bold' 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4A5D7A', // Borda sutil
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
  },
  icon: {
    marginRight: 10,
  },
  input: { 
    flex: 1,
    paddingVertical: 15, 
    color: '#fff', // Texto digitado em branco
    fontSize: 16,
  },
  button: { 
    backgroundColor: '#FF7A00', // Laranja da marca
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#FF7A00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Sombra no Android
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#D0D8E5',
    fontSize: 14,
  },
  linkTextBold: {
    fontWeight: 'bold',
    color: '#fff',
  }
});
