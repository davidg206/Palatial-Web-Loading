import { delegate } from '../DOMDelegate';
import { waitForLevelReady, onPlayAction } from './miscUtils';

const handleSubmitImpl = (firstTimeUser) => {
  /*const data = {
    firstTimeUser: firstTimeUser ? "Yes" : "No",
    timestamp: new Date().getTime(), // current time in Epoch time
  };*/

  waitForLevelReady().then(async () => {
    delegate.formSubmitted = true;
    onPlayAction();
  }).catch(error => {});
};

export default handleSubmitImpl;
