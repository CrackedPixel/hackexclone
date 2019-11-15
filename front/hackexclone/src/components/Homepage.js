import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
const ac = require('../Actions/actionCommands');

export const Homepage = (props) => {
  // const [lcc, slcc] = useState(false);

  // const ff = () => {
  //   return sessionStorage.getItem("ff") || "0";
  // }
  // const sFF = (nVal) => {
  //   sessionStorage.setItem("ff", nVal ? "1" : "0");
  // }
  const mainDispatch = useDispatch();
  const user_info = useSelector(state => state.USER_INFO);
  const can_click = useSelector(state => state.GLOBAL_CLICK);

  if (Object.keys(user_info).length !== 0){
    // console.log("LEN", Object.keys(user_info).length)
    console.log("Returning to dash from home");
    return (
      <Redirect to="/dashboard" />
    )
  }else{
    console.log("Fade dashboard from home set to 0");
    mainDispatch(ac.SET_DID_FADE_DASHBOARD(0));
    // props.propStateData.setDidFadeDashboard(false);
  }

  const handleClicker = e => {
    // if (lcc) {
    //   e.preventDefault();
    //   return; 
    // }
    if (can_click){
      // slcc(true);
      props.canClick();
      // props.propStateData.setCanClick();
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
      <section className="home__logincontainer">
        
      </section>
    </div>
  )
}
