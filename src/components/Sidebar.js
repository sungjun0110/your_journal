import React, { useState, useContext } from 'react'
import './Sidebar.css'
import HambergerMenu from './SidebarIcon'
import { CurrentMenuContext } from '../App'

function Sidebar() {
  const [isClicked, setIsClicked] = useState(false);
  const [currentMenu, setCurrentMenu] = useContext(CurrentMenuContext);

  const buttonHandler = (menu) => {
    setIsClicked(false)
    setCurrentMenu(menu)
  }

  return (
    <div>
      <div id="hamburger" className={isClicked? "clicked" : null}>
        <HambergerMenu 
          setIsClicked={setIsClicked} 
          isClicked={isClicked} 
        />
      </div>
      <nav  id="sidebar" className={isClicked? "clicked" : null}>
        <div id="menuList">
          <button onClick={() => buttonHandler("new")}>New Post</button>
          <button onClick={() => buttonHandler("recent")}>Recent Posts</button>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
