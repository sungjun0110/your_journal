import React, { useState } from 'react'
import './SidebarIcon.css'

function SidebarIcon() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div 
      id="hambergerMenu" 
      className={isClicked? "clicked" : null} 
      onClick={() => setIsClicked(!isClicked)}
    >
      <div className="burgerBtn"></div>
    </div>
  )
}

export default SidebarIcon
