import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// First, create the thunk
export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async function fetchData(params) {
    const { activeCategory, searchValue, currentPage, sortBy, order } = params;
    const category = !!activeCategory ? `category=${activeCategory}&` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    const res = await axios.get(
      `https://64465b720431e885f00fc24e.mockapi.io/Pizzas?page=${currentPage}&limit=4&${category}sortBy=${sortBy}&order=${order}${search}`
    );
    return res.data;
  }
);

const initialState = {
  pizzasItems: [],
  status: 'loading', // loading | success | error
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzasItems(state, action) {
      state.pizzasItems = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.pizzasItems = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.pizzasItems = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.pizzasItems = [];
    },
  },
});

export const { setPizzasItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
