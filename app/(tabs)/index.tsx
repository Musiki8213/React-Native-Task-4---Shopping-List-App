import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { toggleItemPurchased } from '../../store/shoppingListSlice';

const categories = [
  { name: 'Groceries', image: require('../../assets/images/groceries.png') },
  { name: 'Pantry', image: require('../../assets/images/pantry.png') },
  { name: 'Dairy & Eggs', image: require('../../assets/images/dairy.png') },
  { name: 'Personal Care', image: require('../../assets/images/personal.png') },
  { name: 'Baby & Kids', image: require('../../assets/images/baby.png') },
  { name: 'Electronics', image: require('../../assets/images/electronics.png') },
  { name: 'Other Items', image: require('../../assets/images/other.png') },
];

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  const shoppingLists = useSelector((state: RootState) => state.shopping.lists);

  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryPress = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  const handleAddListPress = () => {
    if (!selectedCategory) {
      alert('Please select a category first');
      return;
    }
    router.push(`/add-list?category=${encodeURIComponent(selectedCategory)}`);
  };

  const handleTogglePurchased = (listId: number, itemId: number) => {
    dispatch(toggleItemPurchased({ listId, itemId }));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Basketly</Text>
      <Text style={styles.subHeading}>Your Smart Shopping Companion</Text>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {categories.map((cat, index) => (
          <TouchableOpacity key={index} onPress={() => handleCategoryPress(cat.name)}>
            <View
              style={[
                styles.card,
                selectedCategory === cat.name && styles.highlightCard,
              ]}
            >
              <Image source={cat.image} style={styles.image} />
              <Text style={styles.text}>{cat.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Shopping Lists */}
      <ScrollView style={styles.listContainer} contentContainerStyle={{ paddingTop: 16 }}>
        {shoppingLists.map(list => (
          <View key={list.id} style={{ marginBottom: 16 }}>
            <Text style={styles.listTitle}>
              {list.name} ({list.category})
            </Text>
            {list.items.map(item => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleTogglePurchased(list.id, item.id)}
                style={styles.listItem}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Text
                    style={[
                      styles.itemText,
                      { textDecorationLine: item.purchased ? 'line-through' : 'none' },
                    ]}
                  >
                    {item.name} x{item.quantity}
                  </Text>
                  <Image
                    source={
                      item.purchased
                        ? require('../../assets/images/check.png')
                        : require('../../assets/images/circle.png')
                    }
                    style={styles.checkbox}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* Add List Button */}
      <Pressable style={styles.addButton} onPress={handleAddListPress}>
        <Text style={styles.addText}>Add List</Text>
      </Pressable>
    </View>
  );
}
// St
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
  },
  addButton: {
    width: '98%',
    height: '10%',
    backgroundColor: '#000000',
    alignItems: 'center',
    bottom: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  addText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    justifyContent: 'center',
  },
  categoryText: {
    color: '#000000',
    opacity: 0.5,
    marginLeft: 8,
  },
  highlightCard: {
    borderWidth: 2,
    borderColor: '#5085CF',
  },
  subHeading: {
    fontSize: 16,
    color: '#666666',
    marginLeft: 16,
    marginBottom: 24,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 16,
    marginBottom: 16,
  },
  scrollContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  card: {
    width: 120,
    height: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
  },
  listContainer: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    height: '48%',
    marginBottom: 20,
  },
  listTitle: { 
    fontSize: 18,
    fontWeight: '600', 
    marginBottom: 8 
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 12,
    borderColor: '#E6E7E7',
    backgroundColor: '#FFFFFF',
    shadowColor: '#05060F',
    shadowOpacity: 0.02,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    marginRight: 12,
    marginLeft: 10,
    resizeMode: 'contain',
  },
  itemText: {
    fontSize: 16,
    color: '#000000',
    marginLeft: 8,
  },
});
