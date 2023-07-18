import React from 'react';
import ToolTip from '../assets/Images/png/ToolTip.png';
import MobileToolTip from '../assets/Images/png/MobileToolTip.png';

function ToolTipPopup({ isMobile }) {
  return (
    <div className="ToolTipPopup fadeIn">
      <img 
        className={isMobile ? "mobile-tooltip" : "desktop-tooltip"} 
        src={isMobile ? MobileToolTip : ToolTip} 
        alt="Tool Tip Popup" 
      />
    </div>
  );
}

export default ToolTipPopup;
