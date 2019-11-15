import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Redux
import { useSelector, useDispatch } from 'react-redux';

import { Homepage } from './components/Homepage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { Dashboard } from './components/Dashboard';
import { MyDevice } from './components/Apps/MyDevice';

import './css/main.css';

const actionCommands = require('./Actions/actionCommands');

function App() {
  const mainDispatch = useDispatch();
  const gcVal = useSelector(state => state.GLOBAL_CLICK);

  const clickTimer = () => {
    if (!gcVal) return;
    mainDispatch(actionCommands.SET_GLOBAL_CLICK(false));
    setTimeout(() => {
      mainDispatch(actionCommands.SET_GLOBAL_CLICK(true));
    }, 1000);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Route render={({location}) => (
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={500}
              classNames="fade"
            >
            <Switch location={location}>
              
                <Route exact path="/" render={(props) => <Homepage canClick={clickTimer}/>} />
                <Route exact path="/login" render={(props) => <LoginPage canClick={clickTimer}/>} />
                <Route exact path="/register"  render={(props) => <RegisterPage canClick={clickTimer}/>} />
                <Route exact path="/dashboard"  render={(props) => <Dashboard canClick={clickTimer}/>} />

                <Route exact path="/mydevice"  render={(props) => <MyDevice canClick={clickTimer}/>} />
              
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        )} />
          
        {/* </Route> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
