import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css';
import userIcon from './user.png'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className="profile-dropdown">
      <button onClick={openMenu} style={{height: "64px"}}>
        <img src={userIcon} alt="user icon"/>
        {/* { <a target="_blank" href="https://icons8.com/icon/zXd7HOdmWPxf/user">User</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>} */}

      </button>
      {showMenu && (
        <div >
          <div>{user.username}</div>
          <div>{user.email}</div>
          <div>
            <button onClick={logout}>Log Out</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;