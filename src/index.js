//aqui se va a poner el nuevo componente de redux para que la app tenga acceso al reducer y va a ser el provide
import { Provider } from 'react-redux'; //es un componente padre de todo redux
//hace que todo la app tenga acceso al redux, debe ser el papa de todo
// import Store from './redux/store';

import React from 'react';
import ReactDOM from 'react-dom';
// se debe de poner desde aqui para que se pueda aplicar a toda la app sin que andes poniendolo siempre
import { BrowserRouter } from 'react-router-dom';

//ahora hacemos que llegue el persist y el componente que le va a dar el nuevo contexto
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

import CartProvider from './provider/cart/cart.provider';

import './index.css';
import App from './App';

ReactDOM.render(
    // ya con esto toda la app a a tener acceso a la store
    <Provider store={store}>
        {/* con esto ya tenemos acceso en toda la aplicación */}
        <CartProvider>
            <BrowserRouter>
                <PersistGate persistor={persistor}>
                    <App />
                </PersistGate>
            </BrowserRouter>
        </CartProvider>
    </Provider>,
    document.getElementById('root')
);
