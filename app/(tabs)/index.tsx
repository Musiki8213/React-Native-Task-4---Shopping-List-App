import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

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

  const [shoppingList, setShoppingList] = useState([
    { id: 1, name: 'Dairy Refill', purchased: false, category: 'Dairy & Eggs' },
    { id: 2, name: 'For Cake', purchased: false, category: 'Dairy & Eggs' },
    { id: 3, name: 'Weekly Grocery', purchased: false, category: 'Groceries' },
    { id: 4, name: 'Diapers & Bottle', purchased: false, category: 'Baby & Kids' },
    { id: 5, name: 'Toothpaste', purchased: false, category: 'Personal Care' },
    { id: 6, name: 'Shampoo', purchased: false, category: 'Personal Care' },
    { id: 7, name: 'Weekly Grocery', purchased: false, category: 'Groceries' },
    { id: 8, name: 'Diapers & Bottle', purchased: false, category: 'Baby & Kids' },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [showCategoryWarning, setShowCategoryWarning] = useState(false);

  const handleCategoryPress = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setShowCategoryWarning(false);
  };

  const togglePurchased = (id: number) => {
    setShoppingList(prev =>
      prev.map(item =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      )
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Basketly</Text>
      <Text style={styles.subHeading}>Your Smart Shopping Companion</Text>

      {/* Warning text if no category selected */}
      {showCategoryWarning && (
        <Text style={styles.categoryWarning}>
          Please choose a category first
        </Text>
      )}

      {/* Horizontal Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {categories.map((cat, index) => (
          <TouchableOpacity key={index} onPress={() => handleCategoryPress(cat.name)}>
            <View style={[styles.card, selectedCategory === cat.name && styles.highlightCard]}>
              <Image source={cat.image} style={styles.image} />
              <Text style={styles.text}>{cat.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Shopping List (unchanged) */}
      <ScrollView style={styles.listContainer} contentContainerStyle={{ paddingTop: 16 }}>
        {shoppingList.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => togglePurchased(item.id)}
            style={styles.listItem}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <View>
                <Text style={[styles.itemText, { textDecorationLine: item.purchased ? 'line-through' : 'none' }]}>
                  {item.name}
                </Text>
                <Text style={styles.categoryText}>Category: {item.category}</Text>
              </View>
              <Image
                source={item.purchased
                  ? require('../../assets/images/check.png')
                  : require('../../assets/images/circle.png')}
                style={styles.checkbox}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Add List Button */}
      <Pressable
  style={styles.addButton}
  onPress={() => {
    if (!selectedCategory) {
      setShowCategoryWarning(true);
      return;
    }
    router.push(`/add-list?category=${encodeURIComponent(selectedCategory)}`);
  }}
>
  <Text style={styles.addText}>Add List</Text>
</Pressable>

    </View>
  );
}

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
    borderColor: '#000000',
  },
  categoryWarning: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
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
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 12,
    borderColor: '#E6E7E7',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 0px 2px rgba(5, 6, 15, 0.02)',
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
