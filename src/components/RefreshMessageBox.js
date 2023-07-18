import React, { useEffect, useState } from 'react';

export default function RefreshMessageBox() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setVisible(true), 60000);
    return () => clearTimeout(timeoutId);
  }, []);

  return visible ? (
    <div className="refreshMsgBox fadeIn">
      Refresh the page if loading takes longer than 1 minute 
    </div>
  ) : null;
}
