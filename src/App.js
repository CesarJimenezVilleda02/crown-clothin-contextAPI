import './App.css';
import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component.jsx';
import SignInAndSignOut from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import CheckoutPage from './pages/checkout/checkout.component.jsx';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
//selectors
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

//vamos a hacer que se redireccione cuando ya está signed in el user
import { Route, Switch, Redirect } from 'react-router-dom';

//conectar con redux y el store
import { connect } from 'react-redux';
//importamos la accion que nos va a ayudar a cambiar el state
import { setCurrentUser } from './redux/user/user.actions';

import CurrentUserContext from './contexts/current-user/current-user.context';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            currentUser: null,
        };
    }

    unsubscribeFromAuth = null;

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot((snapShot) => {
                    this.setState({
                        currentUser: {
                            id: snapShot.id,
                            ...snapShot.data(),
                        },
                    });
                });
            }
            // el signout
            this.setState({ currentUser: userAuth });
        });
    }

    componentWillUnmount() {
        // que deje de escuchar
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div className='App'>
                {/* cuando el  current user cambia le llega al provider y cualquier consumer que vaya en la 
                jerarquia hacia abajo se va a recargar con el valor que le llega al provider, sin provider siempre
                los consumidores usarían el valor inicial del contexto*/}
                <CurrentUserContext.Provider value={this.state.currentUser}>
                    {/* a diferencia del redux, este sigue el paradigma de andar pasando las cosas hacia abajo */}
                    <Header />
                </CurrentUserContext.Provider>

                <Switch>
                    <Route exact path='/' component={HomePage} />
                    {/* se lo quitamos porque el shop va a estar variando, cuando varian debemos removerlo */}
                    <Route path='/shop' component={ShopPage} />
                    {/* con esta determinas qué componente renderear */}
                    <Route
                        exact
                        path='/signin'
                        render={() => (this.state.currentUser ? <Redirect to='/' /> : <SignInAndSignOut />)}
                    />
                    <Route exact path='/checkout' component={CheckoutPage} />
                </Switch>
            </div>
        );
    }
}

export default App;
