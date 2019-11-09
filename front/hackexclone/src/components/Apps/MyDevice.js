import React from 'react'
import {Link} from 'react-router-dom';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';


export const MyDevice = () => {

  const handleClicker = e => {

  }

  return (
    <div className="appPage bg-mydevice">
      <section>
        <h1>My Device</h1>
      </section>
      <section>

      </section>
      <section className="mydevice__footer">
        <Link className="linkBtn" onClick={handleClicker} to="/dashboard"><ExitToAppIcon className="flip-x"/><span>Back</span></Link>
      </section>
    </div>
  )
}
