import React, { createContext, useState, useEffect } from 'react';
import { addItemToCart, removeItemFromCart, clearItemFromCart } from './cart.utils';

export const CartContext = createContext({
    hidden: true,
    toggleHidden: () => {},
    cartItems: [],
    addItem: () => {},
    removeItem: () => {},
    clearItemFromCart: () => {},
    cartTotal: 0,
});

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const [hidden, setHidden] = useState(true);

    const toggleHidden = () => setHidden(!hidden);
    // el addItemTocart regresa un nuevo arreglo con lo que ya teniamos mas el nuevo
    // estos reciben el arreglo de items y el que se va a añadir o remover
    const addItem = (item) => setCartItems(addItemToCart(cartItems, item));
    const removeItem = (item) => setCartItems(removeItemFromCart(cartItems, item));
    const clearItem = (item) => setCartItems(clearItemFromCart(cartItems, item));
    const getItemsCount = () => cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const getCartTotal = () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        // los componentes que le lleguen van a ser los que reciban y tengan acceso
        <CartContext.Provider
            value={{
                hidden,
                cartItems,
                cartItemsCount,
                toggleHidden,
                addItem,
                removeItem,
                cartTotal,
                clearItem,
                getItemsCount,
                getCartTotal,
            }}>
            {' '}
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
