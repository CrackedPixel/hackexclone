import React, {useState} from 'react'
import {Link} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

// import CircularProgress from '@material-ui/core/CircularProgress';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


export const Bank = (props) => {
  const mainDispatch = useDispatch();
  const [errorMsg, setErrorMessage] = useState('');

  const global_click = useSelector(state => state.GLOBAL_CLICK);
  
  const handle_click = e => {
    if (!errorMsg && global_click){
      props.canClick();
    }else{
      e.preventDefault();
      return;
    }
  }

  return (
    <div className="appPage bg-bank">

    <section className="bank__footer">
      <Link className="linkBtn" onClick={handle_click} to="/dashboard"><ExitToAppIcon className="back-icon flip-x"/><span>Back</span></Link>
    </section>
    </div>
  )
}
