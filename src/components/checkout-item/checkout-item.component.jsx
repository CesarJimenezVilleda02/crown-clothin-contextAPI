import React, { useContext } from 'react';
import { CartContext } from '../../provider/cart/cart.provider';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem, cartItem: { name, imageUrl, price, quantity, id } }) => {
    const { addItem, removeItem, clearItem } = useContext(CartContext);
    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img alt='item' src={imageUrl} />
            </div>
            {/* utf-8 dingbats -- caracteres y simbolos a partir de codigos, iconos de los que el browser esta enterado */}
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={() => removeItem(cartItem)}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={() => addItem(cartItem)}>
                    &#10095;
                </div>
            </span>
            <span className='price'>{price}</span>
            {/* recordemos que empieza con & y termina con ; */}
            <div className='remove-button' onClick={() => clearItem(cartItem)}>
                &#10005;
            </div>
        </div>
    );
};

export default CheckoutItem;
