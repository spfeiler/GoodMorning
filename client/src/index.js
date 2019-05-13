import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './store/reducer'
import { setAuthenticationHeader } from './utils/authenticate'
import BaseLayout from './components/BaseLayout'
import Login from './components/Login'
import Register from './components/Register'
import Donate from './components/Donate'
import Home from './components/Home'
import News from './components/News'
import Journal from './components/Journal'
import Favorites from './components/Favorites'
import AddEntry from './components/AddEntry'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import requireAuth from './components/requireAuth'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

setAuthenticationHeader(localStorage.getItem('jsonwebtoken'))

ReactDOM.render(
<Provider store={store}>
  <BrowserRouter>
    <BaseLayout>
    <Switch>
      <Route path = "/" exact component = {App} />
      <Route path = "/login" component = {Login} />
      <Route path = "/register" component = {Register} />
      <Route path = "/home" component = {requireAuth(Home)} />
      <Route path = "/news" component = {requireAuth(News)} />
      <Route path = "/journal" component = {requireAuth(Journal)} />
      <Route path = "/favorites" component = {requireAuth(Favorites)} />
      <Route path = "/addentry" component = {requireAuth(AddEntry)} />
      <Route path = "/donate" component = {Donate} />
    </Switch>
    </BaseLayout>
  </BrowserRouter>
</Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
