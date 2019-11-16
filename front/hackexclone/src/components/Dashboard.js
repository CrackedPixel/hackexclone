import React from 'react'
import {Redirect} from 'react-router-dom';
import { AppGridIcon } from './misc/AppGridIcon';

import { useSelector, useDispatch } from 'react-redux';

import ListIcon from '@material-ui/icons/List';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ForumIcon from '@material-ui/icons/Forum';
import LaptopIcon from '@material-ui/icons/Laptop';
import AppsIcon from '@material-ui/icons/Apps';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';

import * as ac from '../Actions/actionCommands';

export const Dashboard = (props) => {
  const mainDispatch = useDispatch();
  const global_click = useSelector(state => state.GLOBAL_CLICK);
  const user_info = useSelector(state => state.USER_INFO);
  const did_fade_dashboard = useSelector(state => state.FADE_DASHBOARD);

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
  
  if (did_fade_dashboard === 0) {
    mainDispatch(ac.SET_DID_FADE_DASHBOARD(1));
    setTimeout(() => {
      mainDispatch(ac.SET_DID_FADE_DASHBOARD(2));
    }, 151)
  }

  const handle_click = e => {
    if (global_click){
      props.canClick();
    }else{
      e.preventDefault();
      return;
    }
  }

  console.log("DASHBOARD__RENDER");

  return (
    <div className="appPage bg-dashboard alwaysBack">
      <div className={did_fade_dashboard === 2 ? "overlay__fader zero-opacity" : "overlay__fader one-opacity"}></div>
      <section className="dashboard__top">
        <h1>Dashboard</h1>
        {
          user_info.charName ? (
            <div className="userinfo__container"><span className="userinfo__name">{user_info.charName}</span><span>&nbsp;level&nbsp;</span><span className="userinfo__level">{user_info.level}</span></div>
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
