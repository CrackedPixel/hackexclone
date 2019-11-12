import React from 'react'
import {Link} from 'react-router-dom';

export const AppGridIcon = props => { //= (props) => {
  return (
    <Link to={props.dest} className="AppGrid__icon__container" onClick={props.clicke}>
      {props.icon}
      <span className="AppGrid__icon__text">{props.iconName}</span>
    </Link>
  )
}
