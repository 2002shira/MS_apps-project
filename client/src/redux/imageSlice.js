import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  category: 'nature',
  page: 1,
  status: 'idle',
  error: null,
  sort: 'id', 
  order: 'asc',
};

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
      state.page = 1;
    },
    nextPage: (state) => {
      state.page += 1;
    },
    prevPage: (state) => {
      if (state.page > 1) state.page -= 1;
    },
    fetchImagesStart: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    fetchImagesSuccess: (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload;
    },
    fetchImagesFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload.sort;
      state.order = action.payload.order;
      state.page = 1;
    },
  }
});

export const {
  setCategory,
  nextPage,
  prevPage,
  fetchImagesStart,
  fetchImagesSuccess,
  fetchImagesFailure,
  setSort,
} = imagesSlice.actions;

export default imagesSlice.reducer;
