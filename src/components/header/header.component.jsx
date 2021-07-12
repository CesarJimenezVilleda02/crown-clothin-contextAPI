import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './header.styles.scss';
import { auth } from '../../firebase/firebase.utils';
import { ReactComponent as Logo } from '../../assets/crown.svg';
//para crear el structured selectot
import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

//1.- importamos connect: es un componente de alto orden en el que envolvemos las cosas para tener acceso a redux
import { connect } from 'react-redux';

// styled components css in js
import { HeaderContainer, LogoContainer, OptionsContainer, OptionDiv, OptionLink } from './header.styles.jsx';

import CurrentUserContext from '../../contexts/current-user/current-user.context';

import { CartContext } from '../../provider/cart/cart.provider';

const Header = () => {
    const { hidden } = useContext(CartContext);

    const currentUser = useContext(CurrentUserContext);

    return (
        <HeaderContainer>
            <LogoContainer to='/'>
                <Logo className='logo' />
                {currentUser ? <h3>{'Welcome ' + currentUser.displayName}</h3> : <div></div>}
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to='/shop'>SHOP</OptionLink>
                <OptionLink to='/contact'>CONTACT</OptionLink>
                {currentUser ? (
                    <OptionDiv onClick={() => auth.signOut()}>SIGN OUT</OptionDiv>
                ) : (
                    <OptionLink to='/signin'>SIGN IN</OptionLink>
                )}
                <CartIcon />
            </OptionsContainer>
            {/* este usa el local */}
            {hidden ? null : ( //con null ya no te sale nada porque si pones un div vacio por el space between todo se va alv
                <CartDropdown />
            )}
        </HeaderContainer>
    );
};

export default Header;
