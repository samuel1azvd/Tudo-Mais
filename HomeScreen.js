// Tela simples de boas-vindas 
// Exibe o nome da lanchonete e uma imagem ilustrativa 
import React from 'react'; 
import { View, Text, Image, StyleSheet } from 'react-native'; 
export default function HomeScreen() { 
return ( 
// Container central da tela 
<View style={styles.container}> 
{/* Nome da lanchonete */} 
<Text style={styles.title}>Lanchonete Delícia</Text> 
{/* Imagem ilustrativa do produto principal */} 
<Image 
source={{ uri: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_960_720.jpg' }} 
style={styles.image} 
/> 
{/* Linha divisória apenas para organização visual */} 
<View style={styles.separator} /> 
</View> 
); 
} 
// Estilos da tela inicial 
const styles = StyleSheet.create({ 
container: { 
flex: 1, 
alignItems: 'center', 
justifyContent: 'center', 
padding: 20, 
}, 
title: { 
fontSize: 28, 
fontWeight: 'bold', 
marginBottom: 20, 
}, 
image: { 
width: 250, 
height: 250, 
borderRadius: 10, 
}, 
separator: { 
marginTop: 30, 
borderBottomColor: '#ccc', 
borderBottomWidth: 1, 
width: '100%', 
}, 
});
