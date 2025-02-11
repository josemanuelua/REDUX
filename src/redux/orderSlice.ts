import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ref, push } from 'firebase/database';
import { db } from '../../firebaseConfig';
import logger from "../../Logging";

// Interface básica para el pedido
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  client: string;
  phone: string;
}

// Crear el thunk para añadir pedidos
export const addOrder = createAsyncThunk(
  'orders/addOrder',
  async (item: OrderItem) => {
    const itemsRef = ref(db, "items");
    await push(itemsRef, item);
    logger.info("Datos enviados a Firebase");
    return item;
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [] as OrderItem[],
    status: 'idle',
    error: null as string | null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error al realizar el pedido';
      });
  },
});

export default orderSlice.reducer;