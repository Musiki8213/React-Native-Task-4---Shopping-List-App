import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Pressable, Alert, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addList } from '../store/shoppingListSlice';

export default function AddListScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const dispatch = useDispatch();

  // Get category passed from HomeScreen
  const initialCategory =
    Array.isArray(params.category) ? params.category[0] : params.category ?? '';

  const [listName, setListName] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [items, setItems] = useState<
    { id: number; name: string; quantity: number; purchased: boolean }[]
  >([]);
  const [nextId, setNextId] = useState(1);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  // Add item
  const handleAddItem = () => {
    if (!itemName.trim()) return;
    setItems(prev => [
      ...prev,
      { id: nextId, name: itemName.trim(), quantity: itemQuantity, purchased: false },
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

  // Toggle purchased (checkbox)
  const togglePurchased = (id: number) => {
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, purchased: !i.purchased } : i))
    );
  };

  // Ellipsis menu toggle
  const handleEllipsisPress = (id: number) => {
    setEditingItemId(id === editingItemId ? null : id);
  };

  // Add List
  const handleAddList = () => {
    if (!listName.trim()) {
      Alert.alert('Error', 'Please enter a list name.');
      return;
    }
    if (!category.trim()) {
      Alert.alert('Error', 'Please choose a category.');
      return;
    }
    if (items.length === 0) {
      Alert.alert('Error', 'Please add at least one item.');
      return;
    }

    // Dispatch to Redux
    dispatch(
      addList({
        name: listName.trim(),
        category: category.trim(),
        items,
      })
    );

    // Go back to Home
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.title}>Add List</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Name of List */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name of List</Text>
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
        {!category && <Text style={styles.categoryWarning}>Please choose a category</Text>}
      </View>

      {/* Add Items Section */}
      <Text style={styles.sectionTitle}>Add Items</Text>
      <View style={styles.addItemContainer}>
        <TextInput
          placeholder="Item Name"
          value={itemName}
          onChangeText={setItemName}
          style={[styles.itemInput, { flex: 1, marginRight: 8 }]}
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
          <Ionicons name="add" size={24} color="#fff" />
        </Pressable>
      </View>

      {/* Items Section */}
      <Text style={styles.sectionTitle}>Items</Text>
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        style={styles.itemsList}
        contentContainerStyle={styles.itemsListContent}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <TouchableOpacity
              onPress={() => togglePurchased(item.id)}
              style={styles.listItemContent}
            >
              <View style={styles.listItemTextContainer}>
                <Text
                  style={[
                    styles.itemName,
                    { textDecorationLine: item.purchased ? 'line-through' : 'none' },
                  ]}
                >
                  {item.name}
                </Text>
                <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
              </View>
              <View style={styles.listItemRight}>
                <Image
                  source={
                    item.purchased
                      ? require('../assets/images/check.png')
                      : require('../assets/images/circle.png')
                  }
                  style={styles.checkbox}
                />
                <TouchableOpacity
                  onPress={() => handleEllipsisPress(item.id)}
                  style={styles.ellipsisButton}
                >
                  <Ionicons name="ellipsis-vertical" size={20} color="#000" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
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
          </View>
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
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 8,
    fontWeight: '400',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E6E7E7',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  categoryHighlight: {
    borderColor: '#FF0000',
  },
  categoryWarning: {
    color: '#FF0000',
    marginTop: 4,
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginTop: 8,
    marginBottom: 12,
  },
  addItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  itemInput: {
    borderWidth: 1,
    borderColor: '#E6E7E7',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E6E7E7',
  },
  quantityButton: {
    fontSize: 18,
    width: 36,
    height: 36,
    textAlign: 'center',
    lineHeight: 36,
    color: '#000000',
    fontWeight: '500',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 12,
    color: '#000000',
    fontWeight: '500',
  },
  addItemButton: {
    backgroundColor: '#000000',
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemsList: {
    flex: 1,
    marginBottom: 100,
  },
  itemsListContent: {
    paddingBottom: 16,
  },
  listItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E6E7E7',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  listItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  listItemTextContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '300',
  },
  listItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    marginRight: 12,
    resizeMode: 'contain',
  },
  ellipsisButton: {
    padding: 4,
  },
  dropdown: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 16,
  },
  dropdownText: {
    fontSize: 16,
    color: '#0000FF',
    fontWeight: '400',
  },
  finalAddButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  finalAddText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
