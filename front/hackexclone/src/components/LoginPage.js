import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Formik, Form, Field } from 'formik';

export const LoginPage = (props) => {  
  const [tIC, sTIC] = useState(props.propStateData.isChangingLogin);
  const [fClass, sfClass] = useState("appPage bg-login");
  const [lcc, slcc] = useState(false);
  
  useEffect(() => {
    sfClass(tIC || props.propStateData.isChangingLogin ? "appPage bg-login alwaysBack" : "appPage bg-login");
  }, [props.propStateData.isChangingLogin]);
  
  const changeTab = (newValue) => e => {
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
    sfClass(newValue ? "appPage bg-login alwaysBack" : "appPage bg-login");
    props.propStateData.setIsChangingLogin(newValue);
    sTIC(newValue);
    
  }

  return (
    <div className={fClass}>
      <section className="login__infobox">
        <h1>Login</h1>
      </section>
      <section className="login__form">
        <Formik>
          <Form className="formik__form--container">
            <Field className="formik__form--field" type="text" name="username" placeholder="username" />
            <Field className="formik__form--field" type="password" name="password" placeholder="password" />
            <button>Login</button>
          </Form>
        </Formik>
        <span>No account? <Link className="linkBtn" onClick={changeTab(true)} to="/register">Register</Link> now</span>
      </section>
      <section className="login__footer">
        <Link className="linkBtn" onClick={changeTab(false)} to="/"><ExitToAppIcon className="flip-x"/><span>Back</span></Link>
      </section>
    </div>
  )
}
