import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import * as ac from '../../Actions/actionCommands';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';


export const MyDevice = (props) => {
   const [ff, sff] = useState(false);

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
          }, 900)
      break;
      case 0:
      break;
      default:
    }
  }

  return (
    <div className="appPage bg-mydevice">
      <div className={!ff ? "overlay__fader zero-opacity" : "overlay__fader one-opacity"}></div>
      <section className="mydevice__title">
        <h1>My Device</h1>
        <div className="mydevice__device__container">
          <div className="mydevice__device__info">
            <span>{`IP: ${user_info.ipaddress}`}</span>
            <span>{`Platform: Nova X`}</span>
            <span>{`CPU: 3.25 GHz 8-Core`}</span>
            <span>{`Network: 5GS`}</span>
          </div>
          <div className="mydevice__device__buttons">
            <button className="mydevice__button" onClick={handle_click} value="0">Change IP</button>
          </div>
        </div>
      </section>
      <section className="mydevice__content">
        <button className="mydevice__button" onClick={handle_click} value="1">Leaderboards</button>
        <button className="mydevice__button" onClick={handle_click} value="2">Wallpaper</button>
        <button className="mydevice__button" onClick={handle_click} value="3">Wiki / Help</button>
        <button className="mydevice__button" onClick={handle_click} value="4">Rate the App</button>
        <button className="mydevice__button" onClick={handle_click} value="5">FAQ</button>
        <button className="mydevice__button" onClick={handle_click} value="-1">Logout</button>
      </section>
      <section className="mydevice__footer">
        <Link className="linkBtn" onClick={handle_click} to="/dashboard"><ExitToAppIcon className="back-icon flip-x"/><span>Back</span></Link>
      </section>
    </div>
  )
}
