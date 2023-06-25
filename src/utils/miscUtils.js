import { delegate } from '../DOMDelegate';

export function getScreenOrientation() {
  let orientation = "";

  if (typeof window.screen.orientation !== 'undefined') {
    orientation = window.screen.orientation.type;
  } else if (typeof window.orientation !== 'undefined') {
    // Deprecated API for older iOS versions
    if (window.orientation === 0 || window.orientation === 180) {
      orientation = "portrait";
    } else {
      orientation = "landscape";
    }
  }

  return orientation;
}

// dedicated server ports
export const port = {
  "tankhouse":  1111,
  "dev":        2222,
  "officedemo": 3333,
  "epic":       4444,
  "demo":       5555,
  "Oslo":       6666,
  "prophet":    7777,
  "45Main":      3333,
  "PalatialDev": 2222
};

export const waitForLevelReady = () => {
  return new Promise(resolve => {
    if (delegate.levelReady) {
      resolve(true);
    } else {
      const checkLevelReady = () => {
        if (delegate.levelReady) {
          resolve(true);
        } else {
          setTimeout(checkLevelReady, 100);
        }
      };

      checkLevelReady();
    }
  });
};

export const waitForProjectName = () => {
  return new Promise(resolve => {
    if (delegate.appName) {
      resolve(delegate.appName);
    } else {
      const checkName = () => {
        if (delegate.appName) {
          resolve(delegate.appName);
        } else {
          setTimeout(checkName, 100);
        }
      };

      checkName();
    }
  });
};

export const onPlayAction = () => {
  delegate.onPlayAction();
  const root = document.getElementById("root");
  root.classList.add("fade-out");
  delegate.levelReady = false;
};
