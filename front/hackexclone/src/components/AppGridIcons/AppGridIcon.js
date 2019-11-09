import React from 'react'

export const AppGridIcon = (props) => {
  return (
    <button className="AppGrid__icon__container" onClick={props.clicke}>
      {props.icon}
      <span className="AppGrid__icon__text">{props.iconName}</span>
    </button>
  )
}
