import React, { useContext } from 'react';
import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
//nos traemos nuestro selector
import { createStructuredSelector } from 'reselect';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import CartProvider, { CartContext } from '../../provider/cart/cart.provider';

//con el dispatch ya nos llega la funcion como prop
const CartIcon = () => {
    const { toggleHidden, cartItemsCount, getItemsCount } = useContext(CartContext);

    return (
        <div className='cart-icon' onClick={toggleHidden}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{getItemsCount()}</span>
        </div>
    );
};

export default CartIcon;
