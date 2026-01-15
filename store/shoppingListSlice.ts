import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
  id: number;
  name: string;
  quantity: number;
  purchased: boolean;
}

interface ShoppingList {
  id: number;
  name: string;
  category: string;
  items: Item[];
}

interface ShoppingState {
  lists: ShoppingList[];
}

const initialState: ShoppingState = {
  lists: [], // start empty
};

const shoppingListSlice = createSlice({
  name: 'shopping',
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<Omit<ShoppingList, 'id'>>) => {
      const newId = state.lists.length > 0 ? state.lists[state.lists.length - 1].id + 1 : 1;
      state.lists.push({ id: newId, ...action.payload });
    },
    toggleItemPurchased: (state, action: PayloadAction<{ listId: number; itemId: number }>) => {
      const list = state.lists.find(l => l.id === action.payload.listId);
      if (!list) return;
      const item = list.items.find(i => i.id === action.payload.itemId);
      if (item) item.purchased = !item.purchased;
    },
    editItem: (state, action: PayloadAction<{ listId: number; itemId: number; name: string; quantity: number }>) => {
      const list = state.lists.find(l => l.id === action.payload.listId);
      if (!list) return;
      const item = list.items.find(i => i.id === action.payload.itemId);
      if (item) {
        item.name = action.payload.name;
        item.quantity = action.payload.quantity;
      }
    },
    deleteItem: (state, action: PayloadAction<{ listId: number; itemId: number }>) => {
      const list = state.lists.find(l => l.id === action.payload.listId);
      if (!list) return;
      list.items = list.items.filter(i => i.id !== action.payload.itemId);
    },
  },
});

export const { addList, toggleItemPurchased, editItem, deleteItem } = shoppingListSlice.actions;
export default shoppingListSlice.reducer;
