import React from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import AllPhotos from './components/AllPhotos/AllPhotos'

function App() {
  return (
    
    <Router>
    <div className="App">
      <Layout>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <Route path='/forgotpass' exact component={ForgotPassword} />
        <Route path='/photos' exact component={AllPhotos} />
      </Switch>
      </Layout>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
