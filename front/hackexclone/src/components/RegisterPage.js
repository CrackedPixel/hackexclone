import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axiosWithAuth from "../utils/axiosWithAuth";
import * as Yup from 'yup';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CircularProgress from '@material-ui/core/CircularProgress';

const sha1 = require('js-sha1');  

export const RegisterPage = (props) => {
  const [lcc, slcc] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  
  const handleClicker = e => {
    if (lcc) {
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
  }

  const handle_submit = (values) => {
    // let encPW = sha1(e.passwd);
    if (props.propStateData.canClick){
      props.propStateData.setCanClick();
      setSubmiting(true);
      let sendData = {
        email: values.email,
        username: values.username,
        password: sha1(values.passwd)
      }
      axiosWithAuth()
      .post("/register", sendData)
      .then( res => {
        setTimeout(() => {
          setSubmiting(false);
        }, 1500)
      })
    }
    
   
  }

  const validate_register = Yup.object().shape({
    email: Yup.string()
      .required("Email required")
      .email("Invalid email"),
    username: Yup.string()
      .required("Username Required")
      .min(3, "Too short")
      .max(16, "Too long"),
    passwd: Yup.string()
      .required("Password required")
      .min(3, "Too short")
      .max(20, "Too long"),
    passwdv: Yup.string()
      .required("Password V required")
      .oneOf([Yup.ref('passwd'), null], "Passwords don't match")
  });

  return (
    <div className="appPage bg-register">
      <section className="register__title">
        <h1>Register</h1>
      </section>
      <section className="register__form">
        <Formik
        initialValues= {{
          email: '',
          username: '',
          passwd: '',
          passwdv: ''
        }}
        onSubmit={handle_submit}
        validationSchema={validate_register}
        isSubmitting={false}
        >
          {formikProps => (
        // render={({errors, status, isSubmitting}) => (
          <Form className="formik__form--container" onSubmit={formikProps.handleSubmit}>  
            <Field className="formik__form--field" 
              value={formikProps.values.email} 
              onChange={formikProps.handleChange}
              type="email" 
              name="email" 
              placeholder="email address" 
            />
            <ErrorMessage name="email" component="div" className="error error-message"/>
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
            <Field className="formik__form--field" 
              value={formikProps.values.passwdv} 
              onChange={formikProps.handleChange}
              type="password" 
              name="passwdv" 
              placeholder="verify password" 
            />
            <ErrorMessage name="passwdv" component="div" className="error error-message"/>
            <button type="submit" disabled={submiting}>Register</button>
            {
              submiting ? ( <CircularProgress className="loadingProgress" /> ) : ( null )
            }
            
          </Form>
        )}
        </Formik>
      </section>
      <section className="register__footer">
      <Link className="linkBtn" onClick={handleClicker} to="/login"><ExitToAppIcon className="flip-x"/><span>Back</span></Link>
      </section>
    </div>
  )
}
