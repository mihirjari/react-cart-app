import React, { createContext, useContext, useReducer } from 'react'
import faker from "faker";
import { cartReducer, productReducer } from './Reducers';

export const cartContext = createContext();
faker.seed(99);

const Context = ({children}) => {

   

    const products = [...Array(20)].map(()=> ({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.random.image(),
        inStock: faker.random.arrayElement([0,3,5,6,7]),
        fastDelivery: faker.datatype.boolean(),
        ratings: faker.random.arrayElement([1,2,3,4,5])
    }));

 

    const [state, dispatch] = useReducer(cartReducer, {
        products: products,
        cart: []
    });

    const [productState, productDispatch] = useReducer(productReducer, {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: ""
    });

   
    
    return <cartContext.Provider value={{state, dispatch, productState, productDispatch}}>{children}</cartContext.Provider>
}

export const CartState = () => {

    return useContext(cartContext);
}



export default Context
