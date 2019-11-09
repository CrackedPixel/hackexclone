import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';

import CircularProgress from '@material-ui/core/CircularProgress';

export const ValidatedForm = (props) => {

  const FormikFieldGen = (elementInfo) => {
    console.log(elementInfo);
    return (
      <React.Fragment key={elementInfo.key}>
        <Field
          key={elementInfo.key} 
          className="formik__form--field" 
          // value={formikProps.values.email} 
          onChange={elementInfo.handleChange}
          type={elementInfo.fieldtype} 
          name={elementInfo.fieldname} 
          placeholder={elementInfo.fieldplaceholder} 
        />
        <ErrorMessage name={elementInfo.fieldname} component="div" className="error error-message"/>
      </React.Fragment>
    )
  }

  return (
    <>
      {
          (!props.eO.errorMsg) ? ( null ) : ( 
            <div className={props.eO.popupClass}>
              <h3>{props.eO.errorTitle}</h3>
              {props.eO.showEM}              
              <button onClick={props.eO.closeDialogue}>ok</button>
            </div>
          )
        }
        <Formik
          initialValues={props.initValues}
          onSubmit={props.handle_submit}
          validationSchema={props.validate_formik_form}
        >
          {formikProps => (
        // render={({errors, status, isSubmitting}) => (
          <Form className="formik__form--container" onSubmit={formikProps.handleSubmit}>  
          {
            props.fields.map((item, i) => {
              return FormikFieldGen({"key": i, "handleChange": formikProps.handleChange, "fieldtype": item.fieldtype, "fieldname": item.fieldname, "fieldplaceholder": item.fieldplaceholder})
            })
          }
            <button type="submit" disabled={props.submiting}>{props.buttonLabel}</button>
            {props.belowBtn}
            {
              props.submiting ? ( <CircularProgress className="loadingProgress" /> ) : ( <div className="loadingProgress">&nbsp;</div> )
            }
            
          </Form>
        )}
        </Formik>
    </>
  )
}
