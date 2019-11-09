import React, {useState, useEffect } from 'react'
import {Link, Redirect } from 'react-router-dom';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axiosWithAuth from "../utils/axiosWithAuth";
import * as Yup from 'yup';

import CircularProgress from '@material-ui/core/CircularProgress';

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
    // let encPW = sha1(e.passwd);
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

  let showEM = errorMsg.split('\n').map((item, i) => {
    return <span key={i}>{item}</span>
  });


  return (
       isLoginOk ? ( <Redirect to="/dashboard"/> ) : (
      <div className={fClass}>
        <div className={faderClass}>{""}</div>
        <section className="login__infobox">
          <h1>Login</h1>
        </section>
        <section className="login__form">
        {
            (errorMsg === "") ? ( null ) : ( 
              <div className={popupClass}>
                <h3>{errorTitle}</h3>
                {showEM}              
                <button onClick={closeDialogue}>ok</button>
              </div>
            )
          }
          <Formik
          initialValues= {{
            username: 'asd',
            passwd: 'asd'
          }}
          onSubmit={handle_submit}
          validationSchema={validate_login}
          >
            {
              formikProps => (
                <Form className="formik__form--container">
                  <Field className="formik__form--field" 
                    value={formikProps.values.username} 
                    onChange={formikProps.handleChange}
                    type="text" 
                    name="username" 
                    placeholder="username" 
                  />
                  <ErrorMessage name="username" component="div" className="error error-message"/>
                  <Field className="formik__form--field" 
                    value={formikProps.values.passwd} 
                    onChange={formikProps.handleChange}
                    type="password" 
                    name="passwd" 
                    placeholder="password" 
                  />
                  <ErrorMessage name="passwd" component="div" className="error error-message"/>
                  <button type="submit" disabled={submiting}>Login</button>
                  {
                    submiting ? ( <CircularProgress className="loadingProgress" /> ) : ( null )
                  }
                </Form>
              )
            }
          </Formik>
          <span>No account? <Link className="linkBtn" onClick={changeTab(true)} to="/register">Register</Link> now</span>
        </section>
        <section className="login__footer">
          <Link className="linkBtn" onClick={changeTab(false)} to="/"><ExitToAppIcon className="flip-x"/><span>Back</span></Link>
        </section>
      </div>
       )
  )
}
