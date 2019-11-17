import React from 'react'

const ErrorDialogue = (props) => {
  let sayAll = props.errorMsg.split('\n').map((item, i) => {
    return <span key={i}>{item}</span>
  })
  return (
      !props.errorMsg ? ( null ) : ( 
      <div className={props.popupClass}>
        <h3>{props.errorTitle}</h3>
        {sayAll}
        <button onClick={props.closeDialogue}>{props.label}</button>
      </div>
    )
  )
}

export default ErrorDialogue;