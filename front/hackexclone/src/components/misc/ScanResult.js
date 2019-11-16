import React from 'react'

export const ScanResult = (props) => {
  return (
    <button className="scan__result">
      <span>{props.ite.ipaddress}</span>
      <span>{props.ite.charName}</span>
    </button>
  )
}
