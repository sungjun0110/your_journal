import React, { useState, useContext } from 'react'
import './Sidebar.css'
import { CurrentMenuContext } from '../App'
import { CredentialsContext } from '../App';

import { IconContext } from 'react-icons';
import { TiArrowSortedDown } from 'react-icons/ti'
import { IoIosLogOut } from 'react-icons/io'

function Sidebar() {
  const [isClicked, setIsClicked] = useState(false);
  const [credentials, setCredentials] = useContext(CredentialsContext);
  const [currentMenu, setCurrentMenu] = useContext(CurrentMenuContext);

  const buttonHandler = (menu) => {
    setIsClicked(false)
    setCurrentMenu(menu)
  }

  const logout = () => {
    setCredentials(null);
  }

  return (
    <div>
      <div 
        id="downArrowBtn" 
        className={isClicked? "clicked" : null} 
        onClick={() => setIsClicked(!isClicked)}
      >
        <IconContext.Provider 
          value={{size: '1.5rem', className: isClicked? 'clicked': null}} 
        >
          <TiArrowSortedDown />
        </IconContext.Provider>
      </div>
      <nav  id="sidebar" className={isClicked? "clicked" : null}>
        <div id="menuList">
          {credentials ? 
            <>
              <button onClick={() => buttonHandler("new")}>New Post</button>
              <button onClick={() => buttonHandler("recent")}>Recent Posts</button>
              <button id="logout" onClick={logout}><IoIosLogOut size="1rem" /> Logout</button>
            </> :
            <button>Please log in</button> 
          }
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
