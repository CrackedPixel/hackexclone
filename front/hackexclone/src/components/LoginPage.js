import React, {useState } from 'react'
import {Link, Redirect } from 'react-router-dom';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import axiosWithAuth from "../utils/axiosWithAuth";
import * as Yup from 'yup';

import { useSelector, useDispatch } from 'react-redux';
import * as ac from '../Actions/actionCommands';

import { ValidatedForm } from './misc/ValidatedForm';

const sha1 = require('js-sha1');  

export const LoginPage = (props) => {  
  let staticPage = "appPage bg-login alwaysBack";
  let dynamicPage = "appPage bg-login";


  let fadeoutEmpty = "overlay__fader zero-opacity";
  let fadeoutStart = "overlay__fader one-opacity";
  

  // const [tIC, sTIC] = useState(is_changing_login);
  // const [fClass, sfClass] = useState(dynamicPage);
  const [faderClass, setFaderClass] = useState(fadeoutEmpty);

  // const [lcc, slcc] = useState(false);
  const [isLoginOk, setIsLoginOk] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [popupClass, setPopupClass] = useState("overlay__error");

  const mainDispatch = useDispatch();

  const is_changing_login = useSelector(state => state.CHANGING_LOGIN);
  const global_click = useSelector(state => state.GLOBAL_CLICK);
  
  if (sessionStorage.getItem("userInfo")){
    return ( <Redirect to="/dashboard" /> )
  }
  
  
  const changeTab = (newValue) => e => {
    if (errorMsg) {
      e.preventDefault();
      return; 
    }
    if (global_click){
      props.canClick();
    }else{
      e.preventDefault();
      return;
    }
    mainDispatch(ac.SET_CHANGING_LOGIN(newValue));
  }

  
  const closeDialogue = e => {
    console.log("Closed");
    setPopupClass("overlay__error shrink");
    setTimeout(() => {
      setErrorMsg("");
      setPopupClass("overlay__error");
    }, 501)
  }

  
  const handle_submit = (values) => {
    if (errorMsg) {
      return;
    }
    if (global_click){
      props.canClick();
      // props.propStateData.setCanClick();
      setSubmiting(true);
      let sendData = {
        username: values.username,
        password: sha1(values.passwd)
      }
      axiosWithAuth()
      .post("/login", sendData, {timeout: 2000})
      .then( res => {
        setTimeout(() => {
          console.log(res.data);
          setSubmiting(false);
          if (res.data.message){
            setErrorTitle(res.data.title);
            setErrorMsg(res.data.message);
            return;
          }
          if (res.data.validLogin){
            setFaderClass(fadeoutStart);
            setTimeout(() => {
              sessionStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
              sessionStorage.setItem("token", res.data.token);
              setIsLoginOk(true); 
            }, 900)
          }
        }, 1000)
      })
      .catch(error => {
        setSubmiting(false);
        setErrorTitle("Error");
        if (error.code === "ECONNABORTED"){
          setErrorMsg("Unable to connect. Please try again later");
          return;
        }
        setErrorMsg(error.message);
      })
    }
  }

  const validate_login = Yup.object().shape({
    username: Yup.string()
      .required("Username Required")
      .min(3, "Too short")
      .max(16, "Too long"),
    passwd: Yup.string()
      .required("Password required")
      .min(3, "Too short")
      .max(20, "Too long")
  });
  
  let eO = {
    "popupClass": popupClass,
    "closeDialogue": closeDialogue,
    "errorTitle": errorTitle,
    "errorMsg": errorMsg,
    "showEM": errorMsg.split('\n').map((item, i) => {
      return <span key={i}>{item}</span>
    })
  }

  console.log("RENDERING LOGIN");

  return (
       isLoginOk ? ( <Redirect to="/dashboard"/> ) : (
      <div className={is_changing_login ? staticPage : dynamicPage}>
        <div className={faderClass}>{""}</div>
        <section className="login__infobox">
          <h1>Login</h1>
        </section>
        <section className="login__form">
          <ValidatedForm 
            validate_formik_form={validate_login} 
            handle_submit={handle_submit}
            fields={[
                {
                  "fieldtype": "username",
                  "fieldname": "username",
                  "fieldplaceholder": "username"
                },
                {
                  "fieldtype": "password",
                  "fieldname": "passwd",
                  "fieldplaceholder": "password"
                }
              ]}
            initValues={{
              username: 'asd',
              passwd: 'asd'
            }}
            eO={eO}
            submiting={submiting}
            buttonLabel="login"
            belowBtn={(<span>No account? <Link className="linkBtn" onClick={changeTab(true)} to="/register">Register</Link> now</span>)}
          />
          
        </section>
        <section className="login__footer">
          <Link className="linkBtn" onClick={changeTab(false)} to="/"><ExitToAppIcon className="back-icon flip-x"/><span>Back</span></Link>
        </section>
      </div>
       )
  )
}
