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
import Ionicons from 'react-native-vector-icons/Ionicons'; 

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState({ texto: '', cor: 'red' });

  const handleRegister = async () => {
    // Validação básica
    if (email.trim() === '' || password.trim() === '') {
      setMensagem({ texto: 'Preencha todos os campos!', cor: '#FF4D4D' }); // Vermelho ajustado para o fundo escuro
      return;
    }

    try {
      const userObject = { savedEmail: email, savedPassword: password };
      await AsyncStorage.setItem('userAccount', JSON.stringify(userObject));

      // Feedback de Sucesso
      setMensagem({ texto: 'Conta criada com sucesso! Redirecionando...', cor: '#4CAF50' }); // Verde ajustado para o fundo escuro
      
      // Espera 2 segundos para o usuário ler a mensagem e volta para o login
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);

    } catch (error) {
      setMensagem({ texto: 'Erro ao salvar os dados.', cor: '#FF4D4D' });
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Lembre-se de colocar o mesmo nome do arquivo do logo que você usou no Login */}
        <Image 
          source={require('./assets/logo-preto.jpeg')} 
          style={styles.logo} 
          resizeMode="contain"
        />

        <Text style={styles.pageTitle}>CRIAR CONTA</Text>
        
        {/* Mensagem de Feedback Dinâmica */}
        {mensagem.texto !== '' && (
          <Text style={[styles.feedback, { color: mensagem.cor }]}>{mensagem.texto}</Text>
        )}

        {/* Input de E-mail */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#fff" style={styles.icon} />
          <TextInput 
            style={styles.input} 
            placeholder="Escolha seu e-mail" 
            placeholderTextColor="#A0AAB5"
            value={email} 
            onChangeText={(t) => { setEmail(t); setMensagem({ texto: '', cor: 'red' }); }} // Limpa o erro ao começar a digitar
            autoCapitalize="none" 
            keyboardType="email-address"
          />
        </View>
        
        {/* Input de Senha */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#fff" style={styles.icon} />
          <TextInput 
            style={styles.input} 
            placeholder="Escolha sua senha" 
            placeholderTextColor="#A0AAB5"
            value={password} 
            onChangeText={(t) => { setPassword(t); setMensagem({ texto: '', cor: 'red' }); }} // Limpa o erro ao começar a digitar
            secureTextEntry 
          />
        </View>

        {/* Botão de Cadastro */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>FINALIZAR CADASTRO</Text>
        </TouchableOpacity>

        {/* Link Voltar */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.linkButton}>
          <Text style={styles.linkText}>Já tem conta? <Text style={styles.linkTextBold}>Faça Login</Text></Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000000', // Fundo preto puro acompanhando a identidade visual
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  logo: {
    width: '100%',
    height: 200, 
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 25,
    letterSpacing: 1,
  },
  feedback: { 
    textAlign: 'center', 
    marginBottom: 15, 
    fontWeight: 'bold', 
    fontSize: 14 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4A5D7A', 
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#000000', 
  },
  icon: {
    marginRight: 10,
  },
  input: { 
    flex: 1,
    paddingVertical: 15, 
    color: '#fff', 
    fontSize: 16,
  },
  button: { 
    backgroundColor: '#FF7A00', 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center',
    marginTop: 10,
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
