import React from 'react';
import ToolTipPopup from '../ToolTipPopup';
import { isMobile } from 'react-device-detect';

const ToolTips = () => {
    return (
        <ToolTipPopup isMobile={isMobile} />
    );
}

export default ToolTips;
