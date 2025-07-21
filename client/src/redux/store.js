import { configureStore } from '@reduxjs/toolkit';
import imagesReducer from './imageSlice.js';

const store = configureStore({
  reducer: {
    images: imagesReducer,
  },
});

export default store;
