// Esta tela mostra um resumo final do pedido 
// Exibe itens escolhidos e valor total 
import React from 'react'; 
import { View, Text, StyleSheet, FlatList } from 'react-native'; 
export default function CheckoutScreen({ route }) { 
// Recebe os itens enviados pela tela de menu 
const items = route.params?.items || []; 
// Filtra apenas itens com quantidade maior que zero 
const selectedItems = items.filter(item => item.qty > 0); 
// Calcula o valor total do pedido 
const total = selectedItems.reduce( 
(sum, item) => sum + item.qty * item.price, 
0 
); 
// Define como cada item do resumo será exibido 
const renderItem = ({ item }) => ( 
<View style={styles.item}> 
<Text>{item.name} x{item.qty} = R$ {(item.qty * item.price).toFixed(2)}</Text> 
</View> 
); 
return ( 
<View style={styles.container}> 
<Text style={styles.title}>Resumo do Pedido</Text> 
<FlatList data={selectedItems} renderItem={renderItem} keyExtractor={item => 
item.id} /> 
<Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text> 
</View> 
); 
} 
// Estilos da tela de fechamento 
const styles = StyleSheet.create({ 
container: { flex: 1, padding: 20 }, 
title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 }, 
item: { marginBottom: 10 }, 
total: { marginTop: 20, fontSize: 20, fontWeight: 'bold' }, 
});
