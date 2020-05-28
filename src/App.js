import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';


import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sing-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';


class App extends React.Component {

  unsubscribeFromAuth = null;
  
  componentDidMount() {
    // =====================================================================================================================
    /* IMPORTANTE DE REDUX */
    const { setCurrentUser } = this.props;
    // =====================================================================================================================
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async  userAuth => { // subscribe
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => { // nos suscribimos a los snapshot traiodos por la ref
          // =====================================================================================================================
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
          // =====================================================================================================================
        });
      } else {
        // =====================================================================================================================
        setCurrentUser(userAuth);
        // =====================================================================================================================
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth(); // al llamar se cancela la subscripcion
  }


  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route 
            exact 
            path='/signin' 
            render={() => 
              this.props.currentUser 
              ? 
              (<Redirect to='/'/>) 
              : 
              (<SignInAndSignUpPage/>) } />

        </Switch>
      </div>)
  }
}

// extraemos el user del state (destructuración)
// este objeto es lo que recibiremos en este coponente
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});
 
const mapDispatchToProps = dispatch => ({
  // esto es el objeto callback 'setCurrentUser' es lo que recibiremos como props en este componete. Y una vez llamado,
  // indicará al store que se cambia el usuario
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

// no mapeamos del stateToProps porque no necesitamos PROPS del currentUser desde el userReducer
export default connect(mapStateToProps, mapDispatchToProps)(App); 
