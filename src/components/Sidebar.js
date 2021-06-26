import React, { useState } from 'react'
import './Sidebar.css'
import HambergerMenu from './SidebarIcon'

function Sidebar() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div>
      <div id="hamburger" className={isClicked? "clicked" : null}>
        <HambergerMenu setIsClicked={setIsClicked} isClicked={isClicked}/>
      </div>
      <nav  id="sidebar" className={isClicked? "clicked" : null}>
        <div id="menuList">
          <button onClick={() => setIsClicked(false)}>Recent post</button>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
