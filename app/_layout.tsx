import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../store';
import React from 'react';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="modal"
          options={{
            presentation: 'modal',
            headerShown: false,
          }}
        />
      </Stack>
    </Provider>
  );
}
