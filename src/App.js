import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import NotFound from './components/NotFound';
import { Route, Switch, Redirect } from "react-router-dom";
import Account from './components/Account';
import Settings from './components/Settings';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import db from './config/Firebase';
import { useEffect } from 'react';

import { useAuth } from "./services/AuthContext"
import { useState } from 'react';
import { Layout } from 'antd';
import Payment from './components/Payment';

const { Content } = Layout;


function App() {

  const { currentUser } = useAuth();
  const [thisUserDoc, setThisUserDoc] = useState(null);


  useEffect( () => {

    if (currentUser) {

      db.collection('users').doc(currentUser.uid).get().then(doc => {

        setThisUserDoc({ ...doc.data(), uid: currentUser.uid });
      })

    }
  }, [])



  return (

    <Layout className="layout app">

      <NavBar thisUserDoc={thisUserDoc} />

      <Content style={{
        padding: '0 30px'
      }}>
        <Switch>

          {/* <PrivateRoute path="/dashboard" component={Dashboard} /> */}
          <Route exact path="/home" component={Home} />
          <Route exact path="/dashboard" component={() => <Dashboard user={thisUserDoc} />} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/payment" component={() => <Payment user={thisUserDoc} />} />
          <Route path="/settings" component={() => <Settings user={thisUserDoc} />} />
          <Route exact path="/not-found" component={NotFound} />

          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" exact component={Home} />
          <Redirect to="/not-found" />
        </Switch>

      </Content>

    </Layout>

  );
}

export default App;
