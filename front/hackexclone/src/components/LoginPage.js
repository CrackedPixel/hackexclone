import React, {useState, useEffect } from 'react'
import {Link, Redirect } from 'react-router-dom';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
import axiosWithAuth from "../utils/axiosWithAuth";
import * as Yup from 'yup';

// import CircularProgress from '@material-ui/core/CircularProgress';
import { ValidatedForm } from './misc/ValidatedForm';

const sha1 = require('js-sha1');  

export const LoginPage = (props) => {  
  let staticPage = "appPage bg-login alwaysBack";
  let fadeoutEmpty = "overlay__fader zero-opacity";
  let fadeoutStart = fadeoutEmpty + " one-opacity";
  let dynamicPage = "appPage bg-login";
  const [tIC, sTIC] = useState(props.propStateData.isChangingLogin);
  const [fClass, sfClass] = useState(dynamicPage);
  const [faderClass, setFaderClass] = useState(fadeoutEmpty);
  const [lcc, slcc] = useState(false);
  const [isLoginOk, setIsLoginOk] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [popupClass, setPopupClass] = useState("overlay__error");
  
  useEffect(() => {
    sfClass(tIC || props.propStateData.isChangingLogin ? staticPage : dynamicPage);
  }, [props.propStateData.isChangingLogin]);
  
  const changeTab = (newValue) => e => {
    if (lcc || errorMsg) {
      e.preventDefault();
      return; 
    }
    if (props.propStateData.canClick){
      slcc(true);
      props.propStateData.setCanClick();
    }else{
      e.preventDefault();
      return;
    }
    sfClass(newValue ? staticPage : dynamicPage);
    props.propStateData.setIsChangingLogin(newValue);
    sTIC(newValue);
    
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
    if (lcc || errorMsg) {
      return;
    }
    if (props.propStateData.canClick){
      props.propStateData.setCanClick();
      setSubmiting(true);
      let sendData = {
        username: values.username,
        password: sha1(values.passwd)
      }
      axiosWithAuth()
      .post("/login", sendData)
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
            props.propStateData.setUserInfo(res.data.userInfo);
            sessionStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
            setFaderClass(fadeoutStart);
            setTimeout(() => {
              setIsLoginOk(true); 
            }, 1001)
          }
        }, 1000)
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

  return (
       isLoginOk ? ( <Redirect to="/dashboard"/> ) : (
      <div className={fClass}>
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
          <Link className="linkBtn" onClick={changeTab(false)} to="/"><ExitToAppIcon className="flip-x"/><span>Back</span></Link>
        </section>
      </div>
       )
  )
}
