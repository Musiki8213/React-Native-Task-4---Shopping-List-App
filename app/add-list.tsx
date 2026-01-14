import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Pressable,
  Alert,
  Image,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AddListScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const initialCategory =
    Array.isArray(params.category) ? params.category[0] : params.category ?? '';

  const [listName, setListName] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [items, setItems] = useState<
    { name: string; quantity: number; id: number; purchased: boolean }[]
  >([]);
  const [nextId, setNextId] = useState(1);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  // Add item
  const handleAddItem = () => {
    if (!itemName) return;
    setItems(prev => [
      ...prev,
      { name: itemName, quantity: itemQuantity, id: nextId, purchased: false },
    ]);
    setNextId(prev => prev + 1);
    setItemName('');
    setItemQuantity(1);
  };

  // Edit/Delete item
  const handleItemAction = (id: number, action: 'edit' | 'delete') => {
    if (action === 'delete') {
      setItems(prev => prev.filter(i => i.id !== id));
    } else {
      const item = items.find(i => i.id === id);
      if (item) {
        setItemName(item.name);
        setItemQuantity(item.quantity);
        setItems(prev => prev.filter(i => i.id !== id));
      }
    }
    setEditingItemId(null);
  };

  const handleEllipsisPress = (id: number) => {
    setEditingItemId(id === editingItemId ? null : id);
  };

  // Toggle purchased (checkbox style preview)
  const togglePurchased = (id: number) => {
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, purchased: !i.purchased } : i))
    );
  };

  // Add List button
  const handleAddList = () => {
    if (!listName.trim()) {
      Alert.alert('Error', 'Please enter a list name.');
      return;
    }
    if (items.length === 0) {
      Alert.alert('Error', 'Please add at least one item.');
      return;
    }

    // Here, dispatch to Redux or save the list
    console.log('New List Added:', { listName, category, items });

    // Navigate back to Home
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <Text style={styles.title}>New List</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* List Name */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>List Name</Text>
        <TextInput
          placeholder="e.g. Weekly Groceries"
          value={listName}
          onChangeText={setListName}
          style={styles.input}
        />
      </View>

      {/* Category */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Category</Text>
        <TextInput
          placeholder="Select Category"
          value={category}
          onChangeText={setCategory}
          style={[styles.input, !category && styles.categoryHighlight]}
        />
        {!category && (
          <Text style={styles.categoryWarning}>Please choose a category</Text>
        )}
      </View>

      {/* Add Item Section */}
      <View style={styles.addItemContainer}>
        <TextInput
          placeholder="Item Name"
          value={itemName}
          onChangeText={setItemName}
          style={[styles.input, { flex: 1, marginRight: 8 }]}
        />
        <View style={styles.quantityContainer}>
          <Pressable onPress={() => setItemQuantity(prev => Math.max(1, prev - 1))}>
            <Text style={styles.quantityButton}>-</Text>
          </Pressable>
          <Text style={styles.quantityText}>{itemQuantity}</Text>
          <Pressable onPress={() => setItemQuantity(prev => prev + 1)}>
            <Text style={styles.quantityButton}>+</Text>
          </Pressable>
        </View>
        <Pressable style={styles.addItemButton} onPress={handleAddItem}>
          <Text style={styles.addItemButtonText}>Add</Text>
        </Pressable>
      </View>

      {/* Items List (checkbox style) */}
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        style={{ marginTop: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => togglePurchased(item.id)}
            style={styles.listItem}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <View>
                <Text style={[styles.itemText, { textDecorationLine: item.purchased ? 'line-through' : 'none' }]}>
                  {item.name} x{item.quantity}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={
                    item.purchased
                      ? require('../assets/images/check.png')
                      : require('../assets/images/circle.png')
                  }
                  style={styles.checkbox}
                />
                <TouchableOpacity onPress={() => handleEllipsisPress(item.id)}>
                  <Ionicons name="ellipsis-vertical" size={24} color="#000" />
                </TouchableOpacity>
              </View>
            </View>
            {editingItemId === item.id && (
              <View style={styles.dropdown}>
                <Pressable onPress={() => handleItemAction(item.id, 'edit')}>
                  <Text style={styles.dropdownText}>Edit</Text>
                </Pressable>
                <Pressable onPress={() => handleItemAction(item.id, 'delete')}>
                  <Text style={[styles.dropdownText, { color: 'red' }]}>Delete</Text>
                </Pressable>
              </View>
            )}
          </TouchableOpacity>
        )}
      />

      {/* Add List Button */}
      <Pressable style={styles.finalAddButton} onPress={handleAddList}>
        <Text style={styles.finalAddText}>Add List</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50, paddingHorizontal: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  backText: { fontSize: 22, color: '#000' },
  title: { flex: 1, textAlign: 'center', fontSize: 20, fontWeight: '600', color: '#000' },
  inputContainer: { marginBottom: 16 },
  label: { fontSize: 14, color: '#000', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
  },
  categoryHighlight: { borderColor: 'red' },
  categoryWarning: { color: 'red', marginTop: 4 },
  addItemContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginRight: 8 },
  quantityButton: { fontSize: 20, width: 32, textAlign: 'center', backgroundColor: '#ddd', borderRadius: 4 },
  quantityText: { fontSize: 16, marginHorizontal: 4 },
  addItemButton: { backgroundColor: '#000', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8 },
  addItemButtonText: { color: '#fff', fontWeight: 'bold' },
  listItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E6E7E7',
    borderRadius: 6,
    backgroundColor: '#fff',
    marginBottom: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  itemText: { fontSize: 16, color: '#000' },
  checkbox: { width: 24, height: 24, marginRight: 8, resizeMode: 'contain' },
  dropdown: { flexDirection: 'row', marginTop: 4 },
  dropdownText: { marginRight: 12, color: 'blue', fontSize: 16 },
  finalAddButton: { backgroundColor: '#000', paddingVertical: 14, borderRadius: 10, marginTop: 20, alignItems: 'center' },
  finalAddText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
