import React, { useContext } from 'react';
import CustomButton from '../custom-button/custom-button.component';
import './cart-dropdown.styles.scss';

import { withRouter } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';

import { CartContext } from '../../provider/cart/cart.provider';

//lo pasa por defecto
const CartDropdown = ({ history }) => {
    const { cartItems, toggleHidden } = useContext(CartContext);
    return (
        <div className='cart-dropdown'>
            <div className='cart-items'>
                {
                    //
                    cartItems.length ? (
                        cartItems.map((item) => {
                            console.log(item);
                            return <CartItem key={item.id} item={item} />;
                        })
                    ) : (
                        <span className='empty-message'>Your cart is empty</span>
                    )
                }
            </div>
            <CustomButton
                onClick={() => {
                    history.push('/checkout');
                    //le despachamos la accion creada, usamos el dispatch que entra por defecto
                    toggleHidden();
                }}>
                GO TO CHECKOUT
            </CustomButton>
        </div>
    );
};

export default withRouter(CartDropdown);
