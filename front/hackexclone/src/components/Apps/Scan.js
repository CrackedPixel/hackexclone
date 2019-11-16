import React from 'react'

import { useSelector, useDispatch } from 'react-redux';
import * as ac from '../../Actions/actionCommands';

export const Scan = () => {
  const mainDispatch = useDispatch();

  const user_info = useSelector(state => state.USER_INFO);
  const global_click = useSelector(state => state.GLOBAL_CLICK);

  if (!sessionStorage.getItem("userInfo")){
    console.log("No user found logged in");
    return (<Redirect to="/" /> )
  }else{
    console.log("Found user");
    if (!user_info.charName) {
      console.log("set info from session to var");
      mainDispatch(ac.SET_USER_INFO(JSON.parse(sessionStorage.getItem('userInfo'))));
    }
  }

  const handle_click = e => {
    if (global_click || ff){
      props.canClick();
    }else{
      e.preventDefault();
      return;
    }
    console.log("Clicked", e.target.value);
    switch (parseInt(e.target.value)) {
      case -1: 
        e.preventDefault();
          sff(true);
          setTimeout(() => {
            sessionStorage.removeItem('userInfo');
          }, 501)
      break;
      case 0:
      break;
      default:
    }
  }

  return (
    <div className="appPage bg-scan">
      
    </div>
  )
}
