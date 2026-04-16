import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    <View style={styles.container}>
      <Text style={styles.title}>TudoMais+</Text>
      <Text style={styles.subtitle}>Loja de Materiais de Limpeza</Text>

      {/* Exibição do Erro */}
      {erro !== '' && <Text style={styles.errorText}>{erro}</Text>}

      <TextInput 
        style={styles.input} 
        placeholder="E-mail" 
        value={email} 
        onChangeText={(t) => { setEmail(t); setErro(''); }} 
        autoCapitalize="none" 
      />

      <TextInput 
        style={styles.input} 
        placeholder="Senha" 
        value={password} 
        onChangeText={(t) => { setPassword(t); setErro(''); }} 
        secureTextEntry 
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={{ marginTop: 20 }}>
        <Text style={{ color: '#007BFF', textAlign: 'center' }}>Ainda não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 35, fontWeight: 'bold', color: '#007BFF', textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 30 },
  errorText: { color: 'red', textAlign: 'center', marginBottom: 15, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
