import React, { useState } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { createStore } from "redux";
import { Provider } from 'react-redux';

import allReducers from './Reducers/index';

import { Homepage } from './components/Homepage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { Dashboard } from './components/Dashboard';
import { MyDevice } from './components/Apps/MyDevice';

import './css/main.css';

function App(props) {
  const [isChangingLogin, setIsChangingLogin] = useState(false);
  const [didFadeDashboard, setDidFadeDashboard] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [canClick, setCanClick] = useState(true);

  const clickTimer = () => {
    setCanClick(false);
    setTimeout(() => {
      setCanClick(true);
    }, 1000);
  }

  const stateData = {
    "isChangingLogin": isChangingLogin,
    "setIsChangingLogin": setIsChangingLogin,
    "canClick": canClick,
    "setCanClick": clickTimer,
    "userInfo": userInfo,
    "setUserInfo": setUserInfo,
    "didFadeDashboard": didFadeDashboard,
    "setDidFadeDashboard": setDidFadeDashboard
  }

  const tempStore = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  
  return (
    // <Provider store={tempStore}>
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
                
                  <Route exact path="/" render={(props) => <Homepage {...props} propStateData={stateData}/>} />
                  <Route exact path="/login" render={(props) => <LoginPage {...props} propStateData={stateData}/>} />
                  <Route exact path="/register"  render={(props) => <RegisterPage {...props} propStateData={stateData}/>} />
                  <Route exact path="/dashboard"  render={(props) => <Dashboard {...props} propStateData={stateData}/>} />

                  <Route exact path="/mydevice"  render={(props) => <MyDevice {...props} propStateData={stateData}/>} />
                
              </Switch>
            </CSSTransition>
          </TransitionGroup>
          )} />
            
          {/* </Route> */}
        </BrowserRouter>
      </div>
    // </Provider>
  );
}

export default App;
