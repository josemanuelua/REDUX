import { createSlice } from '@reduxjs/toolkit';

// El estado inicial de los items del menú
const initialState = [
  {
    id: 1,
    name: "Hamburguesa de Pollo",
    quantity: 40,
    desc: "Hamburguesa de pollo frito y mayonesa",
    price: 24,
    image: "hamburguesapollo.jpg",
  },
  {
    id: 2,
    name: "Hamburguesa de Ternera",
    quantity: 30,
    desc: "Hamburguesa de ternera y queso",
    price: 34,
    image: "hamburguesaternera.jpg",
  },
  {
    id: 3,
    name: "Patatas fritas",
    quantity: 25,
    desc: "Patatas fritas",
    price: 10,
    image: "patatasfritas.jpg"
  },
  {
    id: 4,
    name: "Helado",
    quantity: 50,
    desc: "Cono de chocolate y nata",
    price: 5,
    image: "helado.jpg"
  }
];

const foodSlice = createSlice({
  name: 'foods',
  initialState,
  reducers: {
    // @ts-ignore
    setFoodItems: (state, action) => {
      return action.payload; // Actualiza el estado con los nuevos items
    },
    updateFoodItem: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity; // Actualiza la cantidad del item
      }
    },
  },
});

// Exportamos las acciones que vamos a usar
export const { setFoodItems, updateFoodItem } = foodSlice.actions;

// Exportamos el reducer para usarlo en el store
export default foodSlice.reducer;