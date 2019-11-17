import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom';
import axiosWithAuth from '../../utils/axiosWithAuth';

import { useSelector, useDispatch } from 'react-redux';
import * as ac from '../../Actions/actionCommands';

// import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import CircularProgress from '@material-ui/core/CircularProgress';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { ScanResult } from '../misc/ScanResult';
import ErrorDialogue from '../misc/ErrorDialogue';

export const Scan = (props) => {
  const mainDispatch = useDispatch();
  const [submiting, setSubmiting] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [popupClass, setPopupClass] = useState("overlay__error");
  const [searchResults, setSearchResults] = useState();

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

  // const ip_match = /^(\d+)\.(\d+)\.(\d+)\.(\d+)/;

  // const validate_scan = Yup.object().shape({
  //   scanip: Yup.string()
  //     .required("Required")
  //     .min(8, "Invalid IP")
  //     .max(15, "Invalid IP")
  //     .matches(ip_match, "Invalid IP")
  // })

  const handle_submit = (values) => {
    console.log("Trying submit", values, errorMsg);
    if (errorMsg) return;
    if (global_click){
      props.canClick();
      setSubmiting(true);
      let sendData = {
        "scanip": values.scanip
      }
      axiosWithAuth()
      .post("/apps/scan/scan", sendData, {timeout: 2000})
      .then( res => {
        setTimeout(() => {
          setSubmiting(false);
          if (res.data.message){
            setErrorTitle(res.data.title);
            setErrorMsg(res.data.message);
            return;
          }
          console.log(res.data);
          if (res.data.length === 0){

          }else {
            setSearchResults(res.data.map((item, i) => {
              return <ScanResult key={i} ite={item} />
            }));
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

  const handle_click = e => {
    if (global_click && !submiting){
      props.canClick();
    }else{
      e.preventDefault();
      return;
    }
    console.log("Clicked", e.target.value);
    switch (parseInt(e.target.value)) {
      case 0:
          
      break;
      default: break;
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
        <Formik
          initialValues={{scanip: ''}}
          onSubmit={handle_submit}
          // validationSchema={validate_scan}
        >
          {formikProps => (
            <Form className="formik__form--container" onSubmit={formikProps.handleSubmit}>  
              <Field
                className="formik__form--field" 
                onChange={formikProps.handleChange}
                type='text'
                name='scanip'
                placeholder='ip address' 
              />
              <ErrorMessage name='scanip' component="div" className="error error-message"/>
              <button type="submit" disabled={submiting}>ping</button>
            </Form>
          )}
        </Formik>
      </section>
      <section className="scan__results">
      { <ErrorDialogue popupClass={popupClass} errorTitle={errorTitle} errorMsg={errorMsg} closeDialogue={closeDialogue} label="ok" /> }
      {
        submiting ? ( 
          <CircularProgress className="loadingProgress" /> 
        ) : ( 
          searchResults ? ( searchResults ) : ( <div className="loadingProgress">&nbsp;</div> )
        )
      }
      </section>
      <section className="scan__footer">
        <Link className="linkBtn" onClick={handle_click} to="/dashboard"><ExitToAppIcon className="back-icon flip-x"/><span>Back</span></Link>
      </section>
    </div>
  )
}
