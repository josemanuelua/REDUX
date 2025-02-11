import { configureStore } from '@reduxjs/toolkit';
import foodReducer from './foodSlice'; // Importamos el reducer del slice
import orderReducer from './orderSlice';
import loggerMiddleware from './loggerMiddleware';  // <-- Importamos nuestro middleware

const store = configureStore({
  reducer: {
    foods: foodReducer, // Aquí agregamos el reducer
    orders: orderReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(loggerMiddleware)
});

export default store;