# Task 4 - React Native Shopping List App

**Topic:** React Native  
**Submission Date:** 15 Jan 2026, 09:00

## Project Overview

This is a React Native shopping list application built with Expo. The app allows users to create, manage, and organize shopping lists categorized by different types (e.g., Groceries, Pantry, Dairy & Eggs, etc.). Users can add items with quantities, mark them as purchased, and edit or delete items from their lists.

**Submission Form:** [https://forms.gle/wV3ZD627QQuiwJAo7](https://forms.gle/wV3ZD627QQuiwJAo7)

## Features

### Current Implementation

- **User Interface:**

  - Clean, user-friendly interface for displaying shopping lists.
  - Horizontal scrollable categories with icons (Groceries, Pantry, Dairy & Eggs, Personal Care, Baby & Kids, Electronics, Other Items).
  - Sample shopping list with items categorized and checkboxes to mark as purchased.
  - Add List screen for creating new shopping lists with custom items and quantities.

- **Shopping List Features:**

  - Display list of shopping items with checkboxes to mark as purchased.
  - Add new items to a list with name and quantity.
  - Edit and delete items from the list.
  - Visual feedback for purchased items (strikethrough text and checkmark icon).

- **Navigation:**
  - File-based routing using Expo Router.
  - Tab-based navigation structure.

### Planned Features (Per Technical Requirements)

- **Redux Setup:**

  - Integrate Redux for state management.
  - Define actions for adding, editing, and deleting items.
  - Create reducers to handle state updates.

- **Persistence:**

  - Implement local storage or database to save shopping list data between sessions.
  - Load saved data on app reopen.

- **User Feedback:**

  - Enhanced visual feedback for all CRUD operations.
  - Error handling and messages for invalid inputs.

- **Accessibility (Optional):**

  - Implement accessibility best practices with appropriate labels and ARIA attributes.

- **Testing:**
  - Unit and integration tests for Redux actions and reducers.

## Technical Requirements

- **Framework:** React Native with Expo
- **State Management:** Redux (planned)
- **Persistence:** Local storage/database (planned)
- **UI Components:** Custom styled components with React Native elements
- **Navigation:** Expo Router
- **Icons:** Expo Vector Icons and custom images
- **Styling:** StyleSheet API

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- Android Studio (for Android emulator) or Xcode (for iOS simulator)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd Task4-ShoppingList-React-Native
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npx expo start
   ```

4. **Run on device/emulator:**
   - For Android: `npm run android`
   - For iOS: `npm run ios`
   - For Web: `npm run web`
   - Or scan the QR code with Expo Go app

### Project Structure

```
Task4-ShoppingList-React-Native/
├── app/                    # Main app directory (file-based routing)
│   ├── _layout.tsx         # Root layout
│   ├── (tabs)/             # Tab navigation
│   │   └── index.tsx       # Home screen
│   ├── add-list.tsx        # Add new list screen
│   └── modal.tsx           # Modal component
├── assets/                 # Images and assets
│   └── images/             # Category icons and checkboxes
├── components/             # Reusable components
├── constants/              # App constants (theme, etc.)
├── hooks/                  # Custom hooks
└── scripts/                # Utility scripts
```

## Usage Guide

### Home Screen

- View available categories in a horizontal scroll.
- See a sample shopping list with items and their categories.
- Tap on a category to select it (required before adding a new list).
- Tap on list items to mark/unmark as purchased.
- Press "Add List" to create a new shopping list (category must be selected).

### Adding a New List

- Enter a list name (required).
- Category is pre-filled from selection, but can be edited.
- Add items by entering name and adjusting quantity.
- Tap "Add" to add items to the list.
- Edit or delete items using the ellipsis menu.
- Mark items as purchased in the preview.
- Press "Add List" to save (list name and at least one item required).

## Development Notes

- **Current State:** The app currently uses local state management. Redux integration and persistence are planned for future implementation.
- **Styling:** Uses React Native's StyleSheet for consistent theming.
- **Icons:** Custom PNG images for categories and checkboxes.
- **Navigation:** Expo Router handles routing between screens.

## Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run on web browser
- `npm run lint` - Run ESLint for code quality
- `npm run reset-project` - Reset to a fresh Expo project

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Testing

- Manual testing on multiple platforms (iOS, Android, Web)
- Planned: Unit tests for components and Redux logic
- Planned: Integration tests for state management

## License

This project is for educational purposes as part of Task 4 submission.

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Redux Documentation](https://redux.js.org/) (for planned state management)
