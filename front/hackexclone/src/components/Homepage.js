import React from 'react'
import {Link, Redirect} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
const ac = require('../Actions/actionCommands');

export const Homepage = (props) => {
  const mainDispatch = useDispatch();
  const user_info = useSelector(state => state.USER_INFO);
  const FADE_DASHBOARD = useSelector(state => state.FADE_DASHBOARD);
  const can_click = useSelector(state => state.GLOBAL_CLICK);

  if (FADE_DASHBOARD !== 0){
    mainDispatch(ac.SET_DID_FADE_DASHBOARD(0));
  }

  if (sessionStorage.getItem("userInfo")){
    if (!user_info.charName) {
      console.log("set info from session to var");
      mainDispatch(ac.SET_USER_INFO(JSON.parse(sessionStorage.getItem('userInfo'))));
    }
    return (<Redirect to="/dashboard" /> )
  }

  const handleClicker = e => {
    if (can_click){
      props.canClick();
    }else{
      e.preventDefault();
      return;
    }
  }

  return (
    <div className="appPage alwaysBack bg-home">
      <section className="home__title">
        <h1>Home</h1>
      </section>
      <section className="home__menuList">
        <Link onClick={handleClicker} className="menuBtn" to="/login">Login</Link>
      </section>
      <section className="home__bottomcontainer">
        <p>Note: This app is ONLY designed to be viewed on a mobile device. If you are on a desktop, please use the dev tools to view it as mobile</p>
      </section>
    </div>
  )
}
