import React, { useEffect, useState } from 'react';
import "./Nav.css";

const Nav = () => {
    const [show, handleShow] = useState(false);

    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);
        return () => window.removeEventListener("scroll", transitionNavBar);
    }, []);

  return (
    <div className={`nav ${show && "nav__black"}$`}>
        <div className='nav__contents'>
            <img
                className='nav__logo'
                src='https://loodibee.com/wp-content/uploads/Netflix-logo.png'
                alt='This is Netflix logo'
            />
            <img 
                className='nav__avatar'
                src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
                alt='This is user avatar logo'
            />
        </div>
        

    </div>
  )
}

export default Nav;