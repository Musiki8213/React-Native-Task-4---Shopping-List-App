import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Alert, Image, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { deleteList, toggleItemPurchased } from '../store/shoppingListSlice';

export default function ListModal() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const dispatch = useDispatch();

  const listId = params.listId ? parseInt(Array.isArray(params.listId) ? params.listId[0] : params.listId, 10) : null;
  const shoppingLists = useSelector((state: RootState) => state.shopping.lists);
  const list = listId ? shoppingLists.find(l => l.id === listId) : null;

  if (!list) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>List Not Found</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>
    );
  }

  const handleTogglePurchased = (itemId: number) => {
    dispatch(toggleItemPurchased({ listId: list.id, itemId }));
  };

  const handleDeleteList = () => {
    if (Platform.OS === 'web') {
      // Use browser's native confirm dialog for web
      const confirmed = window.confirm('Are you sure you want to delete this list?');
      if (confirmed) {
        dispatch(deleteList(list.id));
        router.back();
      }
    } else {
      // Use React Native Alert for iOS/Android
      Alert.alert(
        'Delete List',
        'Are you sure you want to delete this list?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              dispatch(deleteList(list.id));
              router.back();
            },
          },
        ],
        { cancelable: true }
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>{list.name}</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Category */}
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText}>{list.category}</Text>
      </View>

      {/* Items List */}
      <ScrollView 
        style={styles.itemsContainer} 
        contentContainerStyle={styles.itemsContent}
        showsVerticalScrollIndicator={true}
      >
        {list.items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No items in this list</Text>
          </View>
        ) : (
          list.items.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleTogglePurchased(item.id)}
              style={styles.itemCard}
              activeOpacity={0.7}
            >
              <View style={styles.itemContent}>
                <View style={styles.itemTextContainer}>
                  <Text
                    style={[
                      styles.itemName,
                      item.purchased && styles.itemNameStrikethrough,
                    ]}
                  >
                    {item.name}
                  </Text>
                  <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                </View>
                <Image
                  source={
                    item.purchased
                      ? require('../assets/images/check.png')
                      : require('../assets/images/circle.png')
                  }
                  style={styles.checkbox}
                />
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Delete Button */}
      <View style={styles.footer}>
        <Pressable
          onPress={handleDeleteList}
          style={({ pressed }) => [
            styles.deleteButton,
            pressed && styles.deleteButtonPressed,
          ]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="trash-outline" size={20} color="#FF0000" />
          <Text style={styles.deleteButtonText}>Delete List</Text>
        </Pressable>
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E7E7',
  },
  backButton: {
    padding: 4,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  categoryContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E7E7',
  },
  categoryText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '300',
  },
  itemsContainer: {
    flex: 1,
  },
  itemsContent: {
    padding: 16,
    paddingBottom: 120,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
  },
  itemCard: {
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
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 4,
  },
  itemNameStrikethrough: {
    textDecorationLine: 'line-through',
    color: '#666666',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '300',
  },
  checkbox: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E6E7E7',
    zIndex: 10,
    elevation: 5,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF0000',
    backgroundColor: '#FFFFFF',
    minHeight: 48,
    width: '100%',
  },
  deleteButtonPressed: {
    opacity: 0.7,
    backgroundColor: '#FFF5F5',
  },
  deleteButtonText: {
    color: '#FF0000',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
});
