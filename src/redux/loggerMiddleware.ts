// src/redux/loggerMiddleware.ts
import { Middleware } from "@reduxjs/toolkit";

const loggerMiddleware: Middleware = (store) => (next) => (action) => {
    // Cada vez que se dispare una acción, esto se ejecutará
    console.log("🚀 Enviando acción:", action);
    console.log("📦 Estado anterior:", store.getState());
    
    const result = next(action);  // Deja que la acción continúe su camino
    console.log("✅ Nuevo estado:", store.getState());
    return result;
};

export default loggerMiddleware;