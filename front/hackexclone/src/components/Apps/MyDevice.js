import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';


export const MyDevice = (props) => {
  const [lcc, slcc] = useState(false);
  const [lui, slui] = useState(false);

  if (!sessionStorage.getItem("userInfo")){
    return (
      <Redirect to="/" />
    )
  }

  if (!props.propStateData.userInfo.username && !lui) {
    slui(true);
    props.propStateData.setUserInfo(JSON.parse(sessionStorage.getItem('userInfo')));
  }

  const handle_click = e => {
    if (lcc) {
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
  }

  const handleLogout = e => {
    sessionStorage.removeItem('userInfo');
  }

  const tUserInfo = props.propStateData.userInfo;

  return (
    <div className="appPage bg-mydevice">
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
        <Link to="/" className="mydevice__button" onClick={handleLogout}>Logout</Link>
      </section>
      <section className="mydevice__footer">
        <Link className="linkBtn" onClick={handle_click} to="/dashboard"><ExitToAppIcon className="back-icon flip-x"/><span>Back</span></Link>
      </section>
    </div>
  )
}
