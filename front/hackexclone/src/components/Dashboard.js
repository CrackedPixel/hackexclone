import React, { useState } from 'react'

export const Dashboard = (props) => {
  const [didFI, setDidFI] = useState(false);

  if (didFI === false) {
    setTimeout(() => {
      setDidFI(true);
    }, 100)
  }

  return (
    <div className="appPage bg-dashboard alwaysBack">
      <div className={didFI ? "overlay__fader zero-opacity" : "overlay__fader one-opacity"}></div>
      <section className="dashboard__top">
        <h1>Dashboard</h1>
      </section>
      <section className="dashboard__appgrid">

      </section>
    </div>
  )
}
