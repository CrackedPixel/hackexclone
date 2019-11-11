import React, { useState } from 'react'
import {Redirect} from 'react-router-dom';
import { AppGridIcon } from './misc/AppGridIcon';

import ListIcon from '@material-ui/icons/List';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ForumIcon from '@material-ui/icons/Forum';
import LaptopIcon from '@material-ui/icons/Laptop';
import AppsIcon from '@material-ui/icons/Apps';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';

export const Dashboard = (props) => {
  const [lcc, slcc] = useState(false);
  const [lui, slui] = useState(false);
  const [ff, sFF] = useState(false);

  if (!sessionStorage.getItem("userInfo")){
    return (
      <Redirect to="/" />
    )
  }

  if (props.propStateData.didFadeDashboard !== true) {
    setTimeout(() => {
      props.propStateData.setDidFadeDashboard(true);
      sFF(true);
    }, 100)
  }

  const handle_click = e => {
    if (lcc || !ff) {
      console.log("lcc, ff", lcc, ff);
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
  }

  if (!props.propStateData.userInfo.username && !lui) {
    slui(true);
    console.log("Set prop");
    props.propStateData.setUserInfo(JSON.parse(sessionStorage.getItem('userInfo')));
    console.log(JSON.parse(sessionStorage.getItem('userInfo')));
  }

  const tUserInfo = props.propStateData.userInfo;

  return (
    <div className="appPage bg-dashboard alwaysBack">
      <div className={props.propStateData.didFadeDashboard ? "overlay__fader zero-opacity" : "overlay__fader one-opacity"}></div>
      <section className="dashboard__top">
        <h1>Dashboard</h1>
        {
          tUserInfo.userName ? (
            <div className="userinfo__container"><span className="userinfo__name">{tUserInfo.userName}</span><span>&nbsp;level&nbsp;</span><span className="userinfo__level">{tUserInfo.level}</span></div>
          ) : ( null )
        }
      </section>
      <section className="dashboard__appgrid">
        <AppGridIcon dest="/" clicke={handle_click} icon={<ListIcon className="AppGrid__icon__icon" />} iconName="processes"/>
        <AppGridIcon dest="/" clicke={handle_click} icon={<TrackChangesIcon className="AppGrid__icon__icon" />} iconName="scan" />
        <AppGridIcon dest="/" clicke={handle_click} icon={<AccountBalanceIcon className="AppGrid__icon__icon" />} iconName="bank account" />
        <AppGridIcon dest="/" clicke={handle_click} icon={<ShoppingCartIcon className="AppGrid__icon__icon" />} iconName="store" />
        <AppGridIcon dest="/" clicke={handle_click} icon={<ForumIcon className="AppGrid__icon__icon" />} iconName="messages" />
        <AppGridIcon dest="/" clicke={handle_click} icon={<LaptopIcon className="AppGrid__icon__icon" />} iconName="log" />
        <AppGridIcon dest="/" clicke={handle_click} icon={<AppsIcon className="AppGrid__icon__icon" />} iconName="apps" />
        <AppGridIcon dest="/mydevice" clicke={handle_click} icon={<PhoneIphoneIcon className="AppGrid__icon__icon" />} iconName="my device" />
      </section>
    </div>
  )
}
