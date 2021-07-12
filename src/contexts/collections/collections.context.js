import { createContext } from 'react';
import SHOP_DATA from '../../redux/shop/shop.data';

// CREAMOS UN NUEVO contexto que guarda el shopdata, este va a ser el valor inicial
const CollectionsContext = createContext(SHOP_DATA);

export default CollectionsContext;
