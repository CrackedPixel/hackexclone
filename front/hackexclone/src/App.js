import React, {useState} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './css/main.css';

import { Homepage } from './components/Homepage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';

function App(props) {
  const [isChangingLogin, setIsChangingLogin] = useState(false);
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
    "setCanClick": clickTimer
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
              
                <Route exact path="/" render={(props) => <Homepage {...props} propStateData={stateData}/>} />
                <Route path="/login" render={(props) => <LoginPage {...props} propStateData={stateData}/>} />
                <Route path="/register"  render={(props) => <RegisterPage {...props} propStateData={stateData}/>} />
              
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
