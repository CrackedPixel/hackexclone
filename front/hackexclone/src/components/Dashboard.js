import React, { useState } from 'react'
import { AppGridIcon } from './AppGridIcons/AppGridIcon';

import ListIcon from '@material-ui/icons/List';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ForumIcon from '@material-ui/icons/Forum';
import LaptopIcon from '@material-ui/icons/Laptop';
import AppsIcon from '@material-ui/icons/Apps';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';

export const Dashboard = (props) => {
  const [didFI, setDidFI] = useState(false);
  const [lcc, slcc] = useState(false);

  if (didFI === false) {
    setTimeout(() => {
      setDidFI(true);
    }, 100)
  }

  const handle_click = (id) => e => {
    if (lcc) {
      e.preventDefault();
      return; 
    }
    if (props.propStateData.canClick){
      slcc(true);
      setTimeout(() => {
        slcc(false);
      }, 1000)
      props.propStateData.setCanClick();
    }else{
      e.preventDefault();
      return;
    }
    console.log("Clicked button ID", id);
  }

  return (
    <div className="appPage bg-dashboard alwaysBack">
      <div className={didFI ? "overlay__fader zero-opacity" : "overlay__fader one-opacity"}></div>
      <section className="dashboard__top">
        <h1>Dashboard</h1>
      </section>
      <section className="dashboard__appgrid">
        <AppGridIcon clicke={handle_click(1)} icon={<ListIcon className="AppGrid__icon__icon" />} iconName="processes"/>
        <AppGridIcon clicke={handle_click(2)} icon={<TrackChangesIcon className="AppGrid__icon__icon" />} iconName="scan" />
        <AppGridIcon clicke={handle_click(3)} icon={<AccountBalanceIcon className="AppGrid__icon__icon" />} iconName="bank account" />
        <AppGridIcon clicke={handle_click(4)} icon={<ShoppingCartIcon className="AppGrid__icon__icon" />} iconName="store" />
        <AppGridIcon clicke={handle_click(5)} icon={<ForumIcon className="AppGrid__icon__icon" />} iconName="messages" />
        <AppGridIcon clicke={handle_click(6)} icon={<LaptopIcon className="AppGrid__icon__icon" />} iconName="log" />
        <AppGridIcon clicke={handle_click(7)} icon={<AppsIcon className="AppGrid__icon__icon" />} iconName="apps" />
        <AppGridIcon clicke={handle_click(8)} icon={<PhoneIphoneIcon className="AppGrid__icon__icon" />} iconName="my device" />
      </section>
    </div>
  )
}
