import React from 'react'
import {Link} from 'react-router-dom';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';


export const MyDevice = () => {

  

  const handleClicker = e => {

  }

  const handleLogout = e => {
    sessionStorage.removeItem('userInfo');
  }

  return (
    <div className="appPage bg-mydevice">
      <section className="mydevice__title">
        <h1>My Device</h1>
      </section>
      <section className="mydevice__content">
      <Link to="/" onClick={handleLogout}>Logout</Link>
      </section>
      <section className="mydevice__footer">
        <Link className="linkBtn" onClick={handleClicker} to="/dashboard"><ExitToAppIcon className="back-icon flip-x"/><span>Back</span></Link>
      </section>
    </div>
  )
}
