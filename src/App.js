import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            }
          })
          // }, () => {
          //     console.log(this.state);
          //     // we have to call console.log(this.state) after we get back the async info from setState because setState is asynchronous, means there is a chance when we call that setState is not finished being called. Only way to call this.state correctly after setState is to pass a second function as an argument to the setState so we can log there
          // })
        });
      }
      else {
        this.setState({currentUser: userAuth});
      }
    });
  }

  // in the componentDidMount() we first check if a user is logged in, then if they exist in the database get back the userRef, but if they do not exist we create it (function is in the firebase.utils) and get back the userRef
  // then we subscribe, listen to the userRef for changes and also get back the first state of the data, which is the snapShot data and id,set the state of the local app.js with the snapshot info, then if the user logs out we;ll make sure to set the currentUser to null

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
    <div>
        <Header currentUser={this.state.currentUser} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/signin" component={SignInAndSignUp} />
      </Switch>
    </div>
  );
  }
}

export default App;
