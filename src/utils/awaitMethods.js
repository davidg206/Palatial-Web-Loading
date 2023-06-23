import { delegate } from '../DOMDelegate';

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
