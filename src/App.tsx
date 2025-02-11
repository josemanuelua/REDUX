import { useEffect, useState } from 'react'
import './App.css'
//import { MenuItem } from './entities/entities';
import Foods from './components/Foods/Foods';
//import logger from '../Logging';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/types'; // Importamos el tipo RootState


//export const foodItemsContext = React.createContext<MenuItem[]>([]);

function App() {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   logger.debug("Cargando App...");
  //   }, []);

    useEffect(() => {
      // Esto disparará una acción que el logger interceptará
      dispatch({ 
        type: 'APP_LOADED',
        payload: 'Cargando App...'
      });
    }, []);
    
  const [isChooseFoodPage, setIsChooseFoodPage] = useState(false);
  // Usamos useSelector para obtener el estado de `foods` (los items del menú)
  const menuItems = useSelector((state:RootState) => state.foods);
  return(
    
      <div className="App">
        <button className="toggleButton" onClick={() =>
          setIsChooseFoodPage
            (!isChooseFoodPage)}>
          {isChooseFoodPage ? "Disponibilidad" : "Pedir Comida"}
        </button>
        <h3 className="title">Comida Rápida Online</h3>
        {!isChooseFoodPage && (
          <>
            <h4 className="subTitle">Menús</h4>
            <ul className="ulApp">
              {menuItems.map((item) => {
                return (
                  <li key={item.id} className="liApp">
                    <p>{item.name}</p><p>#{item.quantity}</p>
                  </li>
                );
              })}
            </ul>
          </>
        )}
        {isChooseFoodPage && <Foods></Foods>}
      </div>
    
)}
export default App
