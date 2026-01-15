import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { deleteList, toggleItemPurchased } from '../../store/shoppingListSlice';

const categories = [
  { name: 'Groceries', image: require('../../assets/images/groceries.png') },
  { name: 'Pantry Staples', image: require('../../assets/images/pantry.png') },
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
  const [expandedListId, setExpandedListId] = useState<number | null>(null);

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

  const handleDeleteList = (listId: number) => {
    Alert.alert(
      'Delete List',
      'Are you sure you want to delete this list?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteList(listId));
            if (expandedListId === listId) {
              setExpandedListId(null);
            }
          },
        },
      ]
    );
  };

  const handleListPress = (listId: number) => {
    setExpandedListId(expandedListId === listId ? null : listId);
  };

  // Check if all items in a list are purchased
  const isListComplete = (list: { items: { purchased: boolean }[] }) => {
    return list.items.length > 0 && list.items.every(item => item.purchased);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Basketly</Text>
      <Text style={styles.subHeading}>Your Smart Shopping Companion</Text>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Categories</Text>
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
      <Text style={[styles.sectionTitle, { marginTop: 0, marginBottom: 0 }]}>Shopping Lists</Text>
      <ScrollView style={styles.listContainer} contentContainerStyle={styles.listContentContainer}>
        {shoppingLists.map(list => {
          const allItemsChecked = isListComplete(list);
          const isExpanded = expandedListId === list.id;
          return (
            <View key={list.id} style={styles.listCard}>
              <TouchableOpacity
                onPress={() => handleListPress(list.id)}
                activeOpacity={0.7}
                style={styles.listCardHeader}
              >
                <View style={styles.listCardContent}>
                  <View style={styles.listCardTextContainer}>
                    <Text
                      style={[
                        styles.listName,
                        allItemsChecked && styles.listNameStrikethrough,
                      ]}
                    >
                      {list.name}
                    </Text>
                    <Text style={styles.listCategory}>{list.category}</Text>
                  </View>
                  <Image
                    source={
                      allItemsChecked
                        ? require('../../assets/images/check.png')
                        : require('../../assets/images/circle.png')
                    }
                    style={styles.listCheckbox}
                  />
                </View>
              </TouchableOpacity>

              {isExpanded && (
                <View style={styles.expandedContent}>
                  {list.items.map(item => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => handleTogglePurchased(list.id, item.id)}
                      style={styles.listItem}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.itemText,
                          item.purchased && styles.itemTextStrikethrough,
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
                        style={styles.itemCheckbox}
                      />
                    </TouchableOpacity>
                  ))}
                  <Pressable
                    onPress={() => handleDeleteList(list.id)}
                    style={styles.deleteButton}
                  >
                    <Ionicons name="trash-outline" size={20} color="#FF0000" />
                    <Text style={styles.deleteButtonText}>Delete List</Text>
                  </Pressable>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* New List Button */}
      <Pressable style={styles.addButton} onPress={handleAddListPress}>
        <Text style={styles.addText}>New List</Text>
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
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 16,
    marginBottom: 8,
  },
  subHeading: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 16,
    marginBottom: 24,
    fontWeight: '300',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 16,
    marginBottom: 12,
    marginTop: 8,
  },
  scrollContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 0,
  },
  card: {
    width: 140,
    height: 160,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E6E7E7',
  },
  highlightCard: {
    borderWidth: 2,
    borderColor: '#5085CF',
  },
  image: {
    width: 70,
    height: 70,
    marginBottom: 12,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
  },
  listContainer: {
    height: 600,
    paddingHorizontal: 16,
    marginBottom: -250,
    marginTop: 0,
  },
  listContentContainer: {
    paddingTop: 0,
    paddingBottom: 16,
  },
  listCard: {
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
    overflow: 'hidden',
  },
  listCardHeader: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  listCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expandedContent: {
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#E6E7E7',
  },
  listCardTextContainer: {
    flex: 1,
  },
  listName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  listNameStrikethrough: {
    textDecorationLine: 'line-through',
  },
  listCategory: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '300',
  },
  listCheckbox: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#000000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E6E7E7',
  },
  itemText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
  },
  itemTextStrikethrough: {
    textDecorationLine: 'line-through',
    color: '#666666',
  },
  itemCheckbox: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF0000',
    backgroundColor: '#FFFFFF',
  },
  deleteButtonText: {
    color: '#FF0000',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
});
