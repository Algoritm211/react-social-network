import React from "react";
import classes from './Navbar.module.css'


const Navbar = () => {
  return (
    <nav className={classes.nav}>
      <div className={classes.item}>
        <a>Profile</a>
      </div>
      <div className={`${classes.item} ${classes.active}`}>
        <a>Messages</a>
      </div>
      <div className={classes.item}>
        <a>News</a>
      </div>
      <div className={classes.item}>
        <a>Music</a>
      </div>
      <div className={classes.item}>
        <a>Settings</a>
      </div>
    </nav>
  );
};

export default Navbar;
