# Basketly - Smart Shopping Companion

A modern, clean React Native shopping list application built with Expo. Organize your shopping with categorized lists, track items with quantities, and mark purchases as you shop.

## 📱 Features

### Home Screen
- **Category Selection**: Browse and select from 7 categories (Groceries, Pantry Staples, Dairy & Eggs, Personal Care, Baby & Kids, Electronics, Other Items)
- **Shopping Lists Display**: View all your shopping lists with:
  - List name and category
  - Visual completion indicator (checkbox)
  - Line-through styling when all items are purchased
- **Expandable Lists**: Tap any list to expand and view/manage items
- **Item Management**: Mark items as purchased/unpurchased directly from the home screen
- **List Deletion**: Delete entire lists with confirmation dialog

### Add List Screen
- **List Creation**: Create new shopping lists with custom names
- **Category Assignment**: Assign lists to categories
- **Item Management**:
  - Add items with custom quantities
  - Quantity selector with +/- controls
  - Edit or delete items using the ellipsis menu
  - Mark items as purchased in preview
- **Form Validation**: Ensures list name, category, and at least one item before saving

## 🛠️ Tech Stack

- **Framework**: React Native with Expo (~54.0.31)
- **State Management**: Redux Toolkit (@reduxjs/toolkit)
- **Navigation**: Expo Router (file-based routing)
- **Icons**: Expo Vector Icons (@expo/vector-icons)
- **Language**: TypeScript
- **Styling**: React Native StyleSheet API

## 📦 Installation

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI (installed globally or via npx)
- For iOS: Xcode (Mac only)
- For Android: Android Studio

### Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd React-Native-Task-4---Shopping-List-App
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   # or
   npx expo start
   ```

4. **Run on your preferred platform:**
   - **iOS**: `npm run ios` (requires Mac with Xcode)
   - **Android**: `npm run android` (requires Android Studio setup)
   - **Web**: `npm run web`
   - **Expo Go**: Scan the QR code with the Expo Go app on your device

## 📁 Project Structure

```
React-Native-Task-4---Shopping-List-App/
├── app/                          # Expo Router file-based routing
│   ├── _layout.tsx              # Root layout configuration
│   ├── (tabs)/                   # Tab navigation group
│   │   ├── _layout.tsx          # Tab layout
│   │   ├── index.tsx            # Home screen (main)
│   │   └── explore.tsx          # Explore tab
│   ├── add-list.tsx             # Add/Edit list screen
│   └── modal.tsx                # Modal component
├── assets/                       # Static assets
│   └── images/                  # Category icons, checkboxes
│       ├── groceries.png
│       ├── pantry.png
│       ├── dairy.png
│       ├── personal.png
│       ├── baby.png
│       ├── electronics.png
│       ├── other.png
│       ├── check.png
│       └── circle.png
├── components/                   # Reusable UI components
│   ├── ui/                      # UI components
│   ├── themed-text.tsx
│   └── themed-view.tsx
├── constants/                    # App constants
│   └── theme.ts                 # Theme configuration
├── hooks/                        # Custom React hooks
│   ├── use-color-scheme.ts
│   └── use-theme-color.ts
├── store/                        # Redux store
│   ├── index.ts                 # Store configuration
│   └── shoppingListSlice.ts    # Shopping list Redux slice
├── scripts/                      # Utility scripts
│   └── reset-project.js
├── app.json                      # Expo configuration
├── package.json                  # Dependencies and scripts
└── tsconfig.json                 # TypeScript configuration
```

## 🎯 Usage Guide

### Creating a Shopping List

1. **Select a Category**: On the home screen, tap one of the category cards (Groceries, Pantry Staples, etc.)
2. **Tap "New List"**: The button at the bottom of the screen
3. **Fill in Details**:
   - Enter a name for your list (e.g., "Weekly Groceries")
   - Category is pre-filled but can be edited
   - Add items with quantities using the quantity selector
4. **Add Items**: 
   - Type item name
   - Adjust quantity with +/- buttons
   - Tap the "+" button to add the item
5. **Review**: Items appear in the preview section below
6. **Save**: Tap "Add List" at the bottom to save

### Managing Lists

- **View Items**: Tap any list card on the home screen to expand and see all items
- **Mark as Purchased**: Tap an item in the expanded list to toggle its purchased status
- **Delete List**: When a list is expanded, tap "Delete List" button (with confirmation)
- **Visual Feedback**: 
  - Completed items show with strikethrough text
  - Lists with all items purchased show a checkmark and strikethrough on the list name

### Editing Items (Add List Screen)

- **Edit**: Tap the ellipsis (⋮) next to an item, then "Edit"
- **Delete**: Tap the ellipsis (⋮) next to an item, then "Delete"
- **Mark Purchased**: Tap the checkbox icon next to an item

## 🔧 Redux State Management

The app uses Redux Toolkit for state management. The shopping list state includes:

### State Structure
```typescript
interface ShoppingState {
  lists: ShoppingList[];
}

interface ShoppingList {
  id: number;
  name: string;
  category: string;
  items: Item[];
}

interface Item {
  id: number;
  name: string;
  quantity: number;
  purchased: boolean;
}
```

### Available Actions
- `addList`: Add a new shopping list
- `toggleItemPurchased`: Toggle purchased status of an item
- `editItem`: Edit item name and quantity
- `deleteItem`: Delete an item from a list
- `deleteList`: Delete an entire shopping list

## 🎨 Design

- **Theme**: Clean, minimal design with white background and black text
- **Colors**: 
  - Primary: Black (#000000)
  - Background: White (#FFFFFF)
  - Accent: Blue (#5085CF) for selected categories
  - Error: Red (#FF0000) for delete actions
- **Typography**: System fonts with varying weights
- **Spacing**: Consistent padding and margins throughout

## 📝 Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint for code quality
- `npm run reset-project` - Reset to a fresh Expo project template

## 🚀 Development

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Consistent component structure
- Redux Toolkit for state management

### Key Components
- **HomeScreen** (`app/(tabs)/index.tsx`): Main screen with categories and lists
- **AddListScreen** (`app/add-list.tsx`): Form for creating new lists
- **ShoppingListSlice** (`store/shoppingListSlice.ts`): Redux slice for state management



**Note**: This app uses Redux for state management. All shopping list data is stored in memory and will be lost when the app is closed. For production use, consider adding data persistence with AsyncStorage or a database solution.
