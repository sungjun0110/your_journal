import React from 'react'
import './SidebarIcon.css'

function SidebarIcon(props) {
  return (
    <div 
      id="hambergerMenu" 
      className={props.isClicked? "clicked" : null} 
      onClick={() => props.setIsClicked(!props.isClicked)}
    >
      <div className="burgerBtn"></div>
    </div>
  )
}

export default SidebarIcon
