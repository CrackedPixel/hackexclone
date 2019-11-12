import React, {useState, useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';


export const MyDevice = (props) => {
  const [lcc, slcc] = useState(false);
  const [ff, sff] = useState(false);
  const [lui, slui] = useState(false);

  useEffect(() => {
    if (!props.propStateData.userInfo.username && !lui) {
      slui(true);
      props.propStateData.setUserInfo(JSON.parse(sessionStorage.getItem('userInfo')));
    }
  }, [slui])

  if (!sessionStorage.getItem("userInfo")){
    return (
      <Redirect to="/" />
    )
  }  

  const handle_click = e => {
    if (lcc || ff) {
      e.preventDefault();
      return; 
    }
    if (props.propStateData.canClick){
      slcc(true);
      setTimeout(() => {
        slcc(false);
      }, 400)
      props.propStateData.setCanClick();
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
          }, 550)
      break;
      case 0:
      break;
      default:
    }
  }

  const tUserInfo = props.propStateData.userInfo;

  return (
    <div className="appPage bg-mydevice">
      <div className={!ff ? "overlay__fader zero-opacity" : "overlay__fader one-opacity"}></div>
      <section className="mydevice__title">
        <h1>My Device</h1>
        <div className="mydevice__device__container">
          <div className="mydevice__device__info">
            <span>{`IP: ${tUserInfo.ipaddress}`}</span>
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
