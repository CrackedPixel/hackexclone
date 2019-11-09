import React from 'react'

export const AppGridIcon = (props) => {
  return (
    <div className="AppGrid__icon__container">
      {props.icon}
      <span className="AppGrid__icon__text">{props.iconName}</span>
    </div>
  )
}
