import React from 'react';
import { createRoot } from 'react-dom/client'; // Correct import for React 18
import App from './App.jsx';
import { Provider } from 'react-redux';
import {store, persistor} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';

const container = document.getElementById('root'); // Get the container element
const root = createRoot(container); // Create a root

// Render the App component within the Provider
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>
);
