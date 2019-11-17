import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import axiosWithAuth from '../../utils/axiosWithAuth';
import { useSelector, useDispatch } from 'react-redux';

// import CircularProgress from '@material-ui/core/CircularProgress';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';


export const Bank = (props) => {
  const mainDispatch = useDispatch();
  const [errorMsg, setErrorMessage] = useState('');
  const [isLoggedIntoBank, SILIB] = useState(false);

  const global_click = useSelector(state => state.GLOBAL_CLICK);

  if (localStorage.getItem("bank_proverbs")) {

  }else{
    // axiosWithAuth()
    // .then()
  }

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
    <section className="bank__top__section">
      <div className="bank__logo__container">
        <AccountBalanceIcon className="bank__logo" />
        <span>pnt</span>
      </div>
      <div className="bank__subtitle__container">
        <span>Welcome to PNT Bank</span>
      </div>
    </section>
    <section className="bank__content__section">
      <div className="bank__login__container">
        <span>Login</span>
        <input tabindex="-1" type="text" value="CrackedPixel" />
        <input tabindex="-1" type="password" value="password" />
        <button tabindex="1" >Login</button>
      </div>
      <span className="bank__content__proverb">"Inspire your inspirations"</span>
    </section>
    <section className="bank__footer">
      <Link className="linkBtn" onClick={handle_click} to="/dashboard"><ExitToAppIcon className="back-icon flip-x"/><span>Back</span></Link>
    </section>
    </div>
  )
}
