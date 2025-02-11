import { useState } from "react";
import { MenuItem } from "../../entities/entities";
import  logger  from "../../../Logging";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/types";
import { updateFoodItem } from "../../redux/foodSlice";
import { useDispatch } from 'react-redux';
import { addOrder } from "../../redux/orderSlice";



// FoodOrder.tsx
interface FoodOrderProps {
  foodItem: MenuItem;
  onBack: () => void;
}

function FoodOrder({ foodItem, onBack }: FoodOrderProps) {
  const [precio, setPrecio] = useState<number>(0);
  const [cantidad, setCantidad] = useState<number>(0);
  const [cliente, setCliente] = useState<string>("");
  const [telefono, setPhone] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>();  
  const [error, setError] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>(""); // Estado para el mensaje de éxito
  const menuItems = useSelector((state:RootState) => state.foods);

    // Verificar si el id existe en los items disponibles
    const itemExists = menuItems.some((item) => item.id === foodItem.id);
    if (!itemExists) {
      throw new Error(`El item con id ${foodItem.id} no existe en el menú.`);
    }
  
  // Manejar cambios en el input
  const handleCantidadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value) || 0; // Capturar el valor del input
    if (value < 0) {
      throw new Error("La cantidad no puede ser negativa"); // Esto será capturado por ErrorBoundary
    }
    setCantidad(value); // Actualizar la cantidad
    setPrecio(value * foodItem.price); // Calcular y actualizar el precio total
  };

  // Manejar cambios en el input
  const handleClienteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Capturar el valor del input y asignarlo
    setCliente(event.target.value); // Actualizar la cantidad

  };

  // Manejar cambios en el input
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Capturar el valor del input y asignarlo
    setPhone(event.target.value); // Actualizar la cantidad

  };

  const handleOrderClick = async () => {
    setIsLoading(true);
  
    if (foodItem.quantity >= cantidad) {
      try {
        dispatch(updateFoodItem({
          id: foodItem.id,
          quantity: foodItem.quantity - cantidad
        }));
  
      // Enviar el pedido
      await dispatch(addOrder({ 
        name: foodItem.name, 
        quantity: cantidad, 
        price: foodItem.price * cantidad, 
        client: cliente, 
        phone: telefono 
      }));
        setMsg("Pedido enviado correctamente");
      } catch (error) {
        console.error("Error al enviar el pedido:", error);
      } finally {
        setIsLoading(false);
      }
      
      setTimeout(() => {
        setMsg("");
        onBack();
      }, 2000);
    } else {
      logger.error("La cantidad del pedido excede al stock existente");
      setError(true);
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <div>
        <h3>{foodItem.name}</h3>
        <img
          src={`${import.meta.env.BASE_URL}images/${foodItem.image}`}
          alt={foodItem.name}
          style={{ width: "300px", borderRadius: "8px" }}
        />
        <p>{foodItem.desc}</p>
        <p>Precio: {precio}€</p>
        <p>Cantidad Requerida: </p>

        <input
          type="number"
          min="1"
          value={cantidad}
          onChange={handleCantidadChange}// Evento de cambio
          style={{ padding: "5px", width: "50px" }}
        />
        <div className="pedido">
          <input
            type="text"
            style={{ padding: "5px", width: "250px", margin: "10px" }}
            placeholder="Introduce tu nombre"
            value={cliente}
            onChange={handleClienteChange}
          />
          <input
            type="text"
            style={{ padding: "5px", width: "250px" }}
            placeholder="Introduce tu numero de telefono"
            value={telefono}
            onChange={handlePhoneChange}
          />
        </div>
      </div>
      <button className="pedir" onClick={handleOrderClick}>
        Pedir
      </button>
      <button className="volver" onClick={onBack}>
        Volver al Menú
      </button>
      {isLoading &&(
        <>
          <p>Procesando Pedido... Por favor espera</p>
        </>
      )}
      {error && (
        <>
          <p>No puedes pedir mas cantidad del stock disponible</p>
          <p>El stock disponible es: {foodItem.quantity}</p>
        </>
      )}
      {msg && <p style={{ color: "green", fontWeight: "bold" }}>{msg}</p>}
    </div>
  );
}

export default FoodOrder;

