import { MenuItem } from '../entities/entities'; // O el tipo que usas para los items del menú
// En tu archivo types.ts o store.ts
import store from './store'; // Ajusta la ruta según tu estructura
export type AppDispatch = typeof store.dispatch;

export interface RootState {
  foods: MenuItem[]; // Aquí indicamos que el estado de foods es un array de FoodItem
}
