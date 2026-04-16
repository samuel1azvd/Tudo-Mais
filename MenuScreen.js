import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function ProdutosScreen({ navigation }) {
  const [items, setItems] = useState([
    { id: '1', name: 'Detergente Neutro', desc: '500ml - Alto brilho', price: 2.50, qty: 0 },
    { id: '2', name: 'Água Sanitária', desc: '2 Litros - Limpeza pesada', price: 8.90, qty: 0 },
    { id: '3', name: 'Esponja de Aço', desc: 'Pacote com 4 unidades', price: 4.50, qty: 0 },
    { id: '4', name: 'Desinfetante', desc: '1 Litro - Fragrância Lavanda', price: 12.00, qty: 0 },
  ]);

  const updateQty = (id, delta) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item
    ));
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name} - R$ {item.price.toFixed(2)}</Text>
        <Text style={styles.desc}>{item.desc}</Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => updateQty(item.id, -1)} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qty}>{item.qty}</Text>
        <TouchableOpacity onPress={() => updateQty(item.id, 1)} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList data={items} renderItem={renderItem} keyExtractor={item => item.id} />
      <Button 
        title="Ver Carrinho" 
        onPress={() => navigation.navigate('Carrinho', { items })} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },
  item: { flexDirection: 'row', marginBottom: 10, padding: 15, backgroundColor: '#fff', borderRadius: 10 },
  name: { fontSize: 16, fontWeight: 'bold' },
  desc: { fontSize: 13, color: '#666' },
  controls: { flexDirection: 'row', alignItems: 'center' },
  button: { backgroundColor: '#007BFF', padding: 8, borderRadius: 5, minWidth: 35, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  qty: { marginHorizontal: 10, fontSize: 16, fontWeight: 'bold' },
});
