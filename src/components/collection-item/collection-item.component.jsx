import React, { useContext } from 'react';
import CustomButton from '../custom-button/custom-button.component';

import './collection-item.styles.scss';

import { CartContext } from '../../provider/cart/cart.provider';

const CollectionItem = ({ id, name, price, imageUrl }) => {
    const { addItem } = useContext(CartContext);

    return (
        <div key={id} className='collection-item'>
            <div className='image' style={{ backgroundImage: `url(${imageUrl})` }}></div>
            <div className='collection-footer'>
                <span className='name'>{name}</span>
                <span className='price'>${price}</span>
            </div>
            {/* recordemos que podemos pasar funciones anónimas dentro de los onclicks, etc. */}
            <CustomButton className='custom-button' inverted onClick={() => addItem({ id, name, price, imageUrl })}>
                Add to cart
            </CustomButton>
        </div>
    );
};

export default CollectionItem;
