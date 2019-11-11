import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom';

export const Homepage = (props) => {
  const [lcc, slcc] = useState(false);

  if (sessionStorage.getItem("userInfo")){
    return (
      <Redirect to="/dashboard" />
    )
  }else{
    props.propStateData.setDidFadeDashboard(false);
  }

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

  return (
    <div className="appPage alwaysBack bg-home">
      <section className="home__title">
        <h1>Home</h1>
      </section>
      <section className="home__menuList">
        <Link onClick={handleClicker} className="menuBtn" to={!lcc ? "/login" : ""}>Login</Link>
      </section>
      <section className="home__logincontainer">
        
      </section>
    </div>
  )
}
