import { Suspense, useState } from "react";
import { MenuItem } from "../../entities/entities";
import React from "react";
import ErrorBoundary from "../../../errorBoundary";
import { useSelector } from "react-redux";
import { RootState } from '../../redux/types'; // Importamos el tipo RootState
//import FoodOrder from "../FoodOrder/FoodOrder";
const FoodOrder = React.lazy(()=>import('../FoodOrder/FoodOrder'))
// interface FoodsProps {
//   foodItems: MenuItem[];
//   //setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>; //  recibimos la función setMenuItems de App
//   //setMenuItems: (item:any)=>void;
// }

function Foods() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const foodItems = useSelector((state:RootState) => state.foods);


  if (selectedItem) {
    return (
      <Suspense fallback={<div> Cargando detalles ......</div>}>
        <ErrorBoundary fallback={<p style={{ color: "red" }}>Ha ocurrido un error en el pedido.</p>}>
        <FoodOrder
          foodItem={selectedItem}
          onBack={() => setSelectedItem(null)}
          // Pasa la función de manejar el pedido
        />
        </ErrorBoundary>
      </Suspense>
    );
  }

  return (
    <>
      <h4 className="foodTitle">Choose from our Menu</h4>
      
      <ul className="ulFoods">
        {foodItems.map((item:MenuItem) => {
          return (
            <li
              key={item.id}
              className="liFoods"
              onClick={() => setSelectedItem(item)}
            >
              <img
                className="foodImg"
                src={`/images/${item.image}`}
                alt={item.name}
              />
              <div className="foodItem">
                <p className="foodDesc">{item.desc}</p>
                <p className="foodPrice">{item.price}$</p>
                <p className="foodQuantity">Available: {item.quantity}</p>
              </div>
            </li>
          );
        })}
      </ul>
      
      <button
      onClick={() =>
        setSelectedItem({
          id: 5, // Un id inexistente
          name: "Item false",
          desc: "Item inexistente",
          price: 0,
          quantity: 0,
          image: "fake.png",
        })
      }
    >
      Forzar ErrorBoundary
    </button>
    </>
  );
}

export default Foods;
