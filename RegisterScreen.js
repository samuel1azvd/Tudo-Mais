import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState({ texto: '', cor: 'red' });

  const handleRegister = async () => {
    // Validação básica
    if (email.trim() === '' || password.trim() === '') {
      setMensagem({ texto: 'Preencha todos os campos!', cor: 'red' });
      return;
    }

    try {
      const userObject = { savedEmail: email, savedPassword: password };
      await AsyncStorage.setItem('userAccount', JSON.stringify(userObject));

      // Feedback de Sucesso
      setMensagem({ texto: 'Conta criada com sucesso! Redirecionando...', cor: 'green' });
      
      // Espera 2 segundos para o usuário ler a mensagem e volta para o login
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);

    } catch (error) {
      setMensagem({ texto: 'Erro ao salvar os dados.', cor: 'red' });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro TudoMais+</Text>
      
      {/* Mensagem de Feedback Dinâmica */}
      {mensagem.texto !== '' && (
        <Text style={[styles.feedback, { color: mensagem.cor }]}>{mensagem.texto}</Text>
      )}

      <TextInput 
        style={styles.input} 
        placeholder="Escolha seu e-mail" 
        value={email} 
        onChangeText={setEmail} 
        autoCapitalize="none" 
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Escolha sua senha" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Finalizar Cadastro</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
        <Text style={{ color: '#007BFF' }}>Voltar para o Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 20 },
  feedback: { textAlign: 'center', marginBottom: 15, fontWeight: 'bold', fontSize: 16 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
