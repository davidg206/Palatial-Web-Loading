import { delegate } from '../DOMDelegate';

export const waitForLevelReady = () => {
  return new Promise((resolve, reject) => {
    const checkReady = () => {
      if (delegate.levelReady) {
        resolve(true);
      } else {
        setTimeout(checkReady, 100);
      }
    };
    checkReady();
  });
};

export const waitForProjectName = () => {
  return new Promise((resolve, reject) => {
    const checkName = () => {
      if (delegate.appName) {
        resolve(delegate.appName);
      } else {
        setTimeout(checkName, 100);
      }
    };
    checkName();
  });
};
