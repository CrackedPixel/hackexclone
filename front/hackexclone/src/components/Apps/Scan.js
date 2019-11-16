import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom';
import axiosWithAuth from '../../utils/axiosWithAuth';

import { useSelector, useDispatch } from 'react-redux';
import * as ac from '../../Actions/actionCommands';

import * as Yup from 'yup';
import { ValidatedForm } from '../misc/ValidatedForm';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export const Scan = (props) => {
  const mainDispatch = useDispatch();
  const [submiting, setSubmiting] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [popupClass, setPopupClass] = useState("overlay__error");

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

  const validate_scan = Yup.object().shape({
    ipaddress: Yup.string()
      .required("Required")
      .matches("^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))",
      "Invalid")
  })

  const handle_click = e => {
    if (global_click){
      props.canClick();
    }else{
      e.preventDefault();
      return;
    }
    console.log("Clicked", e.target.value);
    switch (parseInt(e.target.value)) {
      case -1: 
        
      break;
      case 0:
          e.preventDefault();
          return (<Redirect to="/dashboard" /> )
      default:
        e.preventDefault();
    }
  }
  
  const closeDialogue = e => {
    console.log("Closed");
    setPopupClass("overlay__error shrink");
    setTimeout(() => {
      setErrorMsg("");
      setPopupClass("overlay__error");
    }, 501)
  }

  return (
    <div className="appPage bg-scan">
      <section className="scan__top">
        <ValidatedForm />
      </section>
      <section className="scan__results">

      </section>
      <section className="scan__footer">
        <Link className="linkBtn" onClick={handle_click} to="/dashboard"><ExitToAppIcon className="back-icon flip-x"/><span>Back</span></Link>
      </section>
    </div>
  )
}
